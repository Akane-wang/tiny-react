import React, { useRef, useEffect, CSSProperties, useState, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import style from './balloon.module.less';
import { getOffSet, suffixPx } from '@/dom-utils';
import { EPlacement as E, Type, Trigger, IProps, IPlacement, IArrowPoint, IOffsetAndProps } from './interface';
import { useClickAway } from '@/hooks';
import { getPosition, getPlacementPotion } from './utils';

const defaultProps = {
    type: 'singleLine' as Type,
    placement: E.TOP_LEFT,
    trigger: 'hover' as Trigger,
    showArrow: false
};

const PopContent = forwardRef((props: IOffsetAndProps, ref ) => {
    const balloonRef = useRef<HTMLDivElement>(null);
    const [balloon, setBalloon] = useState({x: 0, y: 0});
    const prop = useMemo(() => {
        return {...defaultProps, ...props};
    }, [props]);

    const popContentTopBottomArrowMiddle = useMemo(() => {

        return [E.TOP_CENTER, E.BOTTOM_CENTER].includes(prop.placement);

    }, [prop.placement]);

    const popContentLeftRightArrowMiddle = useMemo(() => {

        return [E.LEFT_MIDDLE, E.RIGHT_MIDDLE].includes(prop.placement);

    }, [prop.placement]);

    useEffect(() => {
        // 获取到计算出来的结果
        const position = getPosition(prop, balloonRef);
        const bRPosition = balloonRef.current?.getBoundingClientRect();
        // 实体范围
        const balloonPosition = {
            left: position.x - (bRPosition?.width ?? 0) / 2,
            right: position.x + (bRPosition?.width ?? 0 ) / 2,
            top: position.y,
            bottom: position.y + (bRPosition?.height ?? 0),
            width: (bRPosition?.width ?? 0),
            height: (bRPosition?.height ?? 0)
        };
        // 再根据出来的结果去判断是否在屏幕范围内
        const range = {
            top: 0 + window.pageYOffset,
            bottom: window.innerHeight + window.pageYOffset,
            width: window.innerWidth,
            height: window.innerHeight,
            left: 0 + window.pageXOffset,
            right: window.innerWidth + window.pageXOffset,
        };
        const balloonP = Object.assign({}, position);
        // 如果在
        // 超出？那没办法
        if((balloonPosition.width < range.width) && (balloonPosition.right > range.right || balloonPosition.left < range.left)) {
            balloonP.x = balloonPosition.left < 0
                ? (balloonPosition.width / 2)
                : balloonPosition.right > range.right
                    ? (position.x - balloonPosition.right + range.right)
                    : balloonPosition.left;
        }
        else if (balloonPosition.width >= range.width) {
            balloonP.x = 0;
        }

        if(
            (balloonPosition.height < range.height)
            &&
            (balloonPosition.top < range.top || balloonPosition.bottom > range.bottom)
        ) {
            balloonP.y = balloonPosition.top < 0
                ? 0
                : balloonPosition.bottom > range.bottom
                    ? (balloonPosition.top - balloonPosition.bottom + range.bottom)
                    : balloonPosition.top;
        }
        else if(balloonPosition.height >= range.height) {
            balloonP.y = 0;
        }
        // 即正确
        // 否则
        // 处理掉
        setBalloon(balloonP);
    }, [prop]);

    const styleOffset = {
        '--left': suffixPx(balloon.x),
        '--top': suffixPx(balloon.y),
        '--background-color': props.backgroundColor ?? 'rgba(0, 0, 0, 0.88)'
    } as CSSProperties;

    useImperativeHandle(ref, () => {
        return balloonRef.current;
    });
    return (

        <div
            className={ classNames(
                style.popContent,
                {
                    [classNames(style.simpleTipsPopContent)]: prop.type === 'singleLine',
                    [classNames(style.detailedTipsPopContent)]: prop.type === 'multiLine',
                    'mustBeHidden': !prop.visible,
                    [classNames(style.popContentTopBottomArrowMiddle)]: popContentTopBottomArrowMiddle,
                    [classNames(style.popContentLeftRightArrowMiddle)]: popContentLeftRightArrowMiddle,
                },
                props.contentClassName
            ) }
            style={ styleOffset }
            ref={ balloonRef }
        >
            <div
                className={
                    classNames(
                        style['arrow'],
                        style[`placement-${getPlacementPotion(prop.placement, 'placement') as keyof IPlacement}`],
                        style[`arrowPoint-${getPlacementPotion(prop.placement, 'arrowPoint') as keyof IArrowPoint}`],
                        classNames(
                            {
                                [classNames(style.arrPointPlaceTopBottomMiddle)]: popContentTopBottomArrowMiddle,
                                [classNames(style.arrPointPlaceLeftRightMiddle)]: popContentLeftRightArrowMiddle,
                                [style['hidden-in-sm']]: prop.showArrow
                            }
                        )
                )
            }
            >
            </div>
            <div className={ classNames(style.children) }>
                { prop.content }
            </div>
        </div>
    );
});

const ReoBalloon: React.FC<IProps> = function(props) {
    const initialPos = useMemo(() => {
        return { top: 0, left: 0};
    }, []);
    const [offset, setOffset] = useState(Object.assign( initialPos, { width: 0 } ));
    const [visible, setVisible] = useState(false);
    const IconRef = useRef<HTMLDivElement>(null);
    const portalsRef = useRef<HTMLDivElement>(null);

    // 一定要在hover时重新获取定位
    const mouseEnter = useCallback((): void => {
        const iconPosition = getOffSet(IconRef.current);
        setOffset(Object.assign({ ...iconPosition ?? initialPos, width: IconRef.current?.clientWidth }));
        setVisible(true);
    }, [initialPos]);

    const mouseLeave = useCallback((): void => {
        setVisible(false);
    }, []);

    useClickAway(() => {
        if(visible) {
            setVisible(false);
        }
    }, [IconRef, portalsRef]);
    return (
        <div
            className={ classNames(style.balloonWrap, style[props.type!], props.className) }
            ref={ IconRef }
            onMouseEnter={ mouseEnter }
            onMouseLeave={ mouseLeave }
            onTouchEnd={ mouseEnter }
        >
            {
                ReactDOM.createPortal(
                    <PopContent
                        { ...props }
                        offsetTop={ offset.top }
                        offsetLeft={ offset.left }
                        visible={ visible }
                        targetWidth={ offset.width }
                        visibleHandle={ setVisible }
                        ref={ portalsRef }
                    />, document.body)
            }

            { props.children }
        </div>
    );
};

export { ReoBalloon };
