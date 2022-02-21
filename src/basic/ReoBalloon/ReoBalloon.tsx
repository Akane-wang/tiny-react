import React, { useRef, useEffect, CSSProperties, useState, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import style from './balloon.module.less';
import { getOffSet, suffixPx } from '@/dom-utils';
import { EPlacement as E, Type, Trigger, IProps, IPlacement, IArrowPoint, IOffsetAndProps, IBalloon } from './interface';
import { useClickAway } from '@/hooks';

const defaultProps = {
    type: 'singleLine' as Type,
    placement: E.TOP_LEFT,
    trigger: 'hover' as Trigger,
    showArrow: false
};

function getPlacementPotion(propsPlacement: E, positionType: 'placement' | 'arrowPoint'): string  {
    const placement: IPlacement = {
        top: [E.TOP_LEFT, E.TOP_CENTER, E.TOP_RIGHT],
        bottom: [E.BOTTOM_LEFT, E.BOTTOM_CENTER, E.BOTTOM_RIGHT],
        right: [E.RIGHT_TOP, E.RIGHT_MIDDLE, E.RIGHT_BOTTOM],
        left: [E.LEFT_TOP, E.LEFT_MIDDLE, E.LEFT_BOTTOM]
    };

    const arrowPoint: IArrowPoint = {
        left: [E.TOP_LEFT, E.BOTTOM_LEFT],
        top: [E.RIGHT_TOP, E.LEFT_TOP],
        right: [E.TOP_RIGHT, E.BOTTOM_RIGHT],
        bottom: [E.RIGHT_BOTTOM, E.LEFT_BOTTOM],
        middle: [E.RIGHT_MIDDLE, E.LEFT_MIDDLE, E.TOP_CENTER, E.BOTTOM_CENTER]
    };

    let res = '';
    if(positionType === 'placement') {
        for(const [k, v] of Object.entries(placement)) {
            if(v.includes(propsPlacement)) {
                res = k;
                break;
            }
        }
    }
    else {
        for(const [k, v] of Object.entries(arrowPoint)) {
            if(v.includes(propsPlacement)) {
                res = k;
                break;
            }
        }
    }
    return res;
}

function getPosition(prop: IOffsetAndProps, balloonRef: React.RefObject<HTMLDivElement>): IBalloon {
    let x = 0, y = 0;
    const balloonRefWidth = balloonRef.current?.offsetWidth ?? 0;
    const balloonRefHeight = balloonRef.current?.offsetHeight ?? 0;
    const targetWidth = Number(prop.targetWidth) ?? 0;
    const arrowPointWidth = 10;
    const arrowPointHeight = 5;
    const arrowPointAndIconSpace = 2;
    const topBottomArrowOffset = 14;
    const leftRightArrowOffset = 5;
    switch(prop.placement) {
        case E.TOP_RIGHT:
            x = prop.offsetLeft! - balloonRefWidth + topBottomArrowOffset + arrowPointWidth / 2 + targetWidth / 2;
            y = prop.offsetTop! - balloonRefHeight - arrowPointHeight - arrowPointAndIconSpace;
            break;
        case E.TOP_LEFT:
            x = prop.offsetLeft! - topBottomArrowOffset - arrowPointWidth / 2 + targetWidth / 2;
            y = prop.offsetTop! - balloonRefHeight - arrowPointHeight - arrowPointAndIconSpace;
            break;
        case E.TOP_CENTER:
            x = prop.offsetLeft! + targetWidth / 2;
            y = prop.offsetTop! - balloonRefHeight - arrowPointHeight - arrowPointAndIconSpace;
            break;
        case E.BOTTOM_RIGHT:
            x = prop.offsetLeft! - balloonRefWidth + topBottomArrowOffset + arrowPointWidth / 2 + targetWidth / 2;
            y = prop.offsetTop! + targetWidth + arrowPointHeight + arrowPointAndIconSpace;
            break;
        case E.BOTTOM_CENTER:
            x = prop.offsetLeft! + targetWidth / 2;
            y = prop.offsetTop! + targetWidth + arrowPointHeight + arrowPointAndIconSpace;
            break;
        case E.BOTTOM_LEFT:
            x = prop.offsetLeft! - topBottomArrowOffset - arrowPointWidth / 2 + targetWidth / 2;
            y = prop.offsetTop! + targetWidth + arrowPointHeight + arrowPointAndIconSpace;
            break;
        case E.RIGHT_TOP:
            x = prop.offsetLeft! + targetWidth + arrowPointHeight + arrowPointAndIconSpace;
            y = prop.offsetTop! + targetWidth / 2 - arrowPointHeight / 2 - leftRightArrowOffset;
            break;
        case E.RIGHT_MIDDLE:
            x = prop.offsetLeft! + targetWidth + arrowPointHeight + arrowPointAndIconSpace;
            y = prop.offsetTop! + targetWidth / 2;
            break;
        case E.RIGHT_BOTTOM:
            x = prop.offsetLeft! + targetWidth + arrowPointHeight + arrowPointAndIconSpace;
            y = prop.offsetTop! - balloonRefHeight + arrowPointWidth / 2 + leftRightArrowOffset + targetWidth / 2;
            break;
        case E.LEFT_TOP:
            x = prop.offsetLeft! - arrowPointAndIconSpace - balloonRefWidth - arrowPointHeight;
            y = prop.offsetTop! + targetWidth / 2 - arrowPointHeight / 2 - leftRightArrowOffset;
            break;
        case E.LEFT_MIDDLE:
            x = prop.offsetLeft! - balloonRefWidth - arrowPointHeight - arrowPointAndIconSpace;
            y = prop.offsetTop! + targetWidth / 2;
            break;
        case E.LEFT_BOTTOM:
            x = prop.offsetLeft! - balloonRefWidth - arrowPointHeight - arrowPointAndIconSpace;
            y = prop.offsetTop! - balloonRefHeight + targetWidth / 2 + 5;
            break;
        default: break;
    }

    return {x, y};
}

const PopContent = forwardRef((props: IOffsetAndProps, ref ) => {
    const prop = useMemo(() => {
        return {...defaultProps, ...props};
    }, [props]);
    const balloonRef = useRef<HTMLDivElement>(null);
    const [balloon, setBalloon] = useState({x: 0, y: 0});
    const popContentTopBottomArrowMiddle = [E.TOP_CENTER, E.BOTTOM_CENTER].includes(prop.placement);
    const popContentLeftRightArrowMiddle = [E.LEFT_MIDDLE, E.RIGHT_MIDDLE].includes(prop.placement);

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
    const width = {width: 0};
    const [offset, setOffset] = useState(Object.assign(initialPos, width));
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
