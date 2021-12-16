import classnames from 'classnames';
import React, { CSSProperties, useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import ReoIcon, { EIconType } from '@/basic/ReoIcon';
import { Size, IGhost, IDark, ILight, IUnset, IAction } from './interface';
import style from './button.module.less';
import { defaultIcon } from './style';
import { suffixPx } from '@/dom-utils';
import { useResize } from '@/hooks';

const defaultProps = {
    size: 'large',
    type: 'ghost',
    transition: true,
    initIndex: 0,
    loop: false,
    showCount: 0
};

function reducerCurrentCount(state: number, action: IAction): any {
    let resCount = state;

    switch(action.type) {
        case 'next': resCount = state + action.showCount; break;
        case 'prev': resCount = state - action.showCount; break;
        default: throw new Error('Invalid state');
    }

    if(action.loop) { // 循环，则取余
        return resCount % action.childrenLength;
    }

    return resCount; // 不循环，直接返回count
}

const CarouselButton: React.FC<IGhost | IDark | ILight | IUnset> = (prop) => {

    const props = useMemo(() => {
        return {...defaultProps, ...prop};
    }, [prop]);

    const childrenLength = useMemo(() => {
        return React.Children.count(props.children);
    }, [props.children]);

    const clickNextRef = useRef<HTMLDivElement>(null);
    const clickPrevRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null); // 容器盒子
    const realContentRef = useRef<HTMLDivElement>(null); // 绑定真实盒子
    const [swipeCount, setSwipeCount] = useState(0); // 还可以切换的次数
    const childrenWidth = useRef(0); // 一版的显示宽度
    const { widthOfWindow } = useResize();
    const swipeTotal = useRef(0);
    useEffect(() => {
        childrenWidth.current = ((containerRef.current?.clientWidth??0) * 0.9);
        swipeTotal.current = Math.ceil((realContentRef.current?.clientWidth ?? 0) / childrenWidth.current);
    }, [widthOfWindow]);

    const [currentIndex, dispatchCurrentCount] = useReducer(reducerCurrentCount, props.initIndex);

    const iconWidthPadding = useMemo(() => {
        const res = {};
        if(props.type !== 'unset') {
            const { icon, width, padding } = { ...defaultIcon[props.type] };
            return Object.assign(res, { icon, width, padding });
        }
        else {
            const { left, right, color, hoverColor, hoverBgColor, bgColor, boxShadow, hoverBoxShadow, width, padding } = props;
            const icon = { left, right, color, hoverColor, hoverBgColor, bgColor, boxShadow, hoverBoxShadow };
            return Object.assign(res, { icon, width, padding });
        }

    }, [props]);

    const handleNext = useCallback((showCount: number, next, count) => {

        if(showCount) {

            dispatchCurrentCount({type: 'next', showCount, childrenLength, loop: props.loop});

        }
        else {
            setSwipeCount(count + 1);
        }
        next?.(currentIndex);

    }, [currentIndex, childrenLength, props.loop]);

    const handlePrev = useCallback((showCount: number, prev, count) => {
        if(showCount) {

            dispatchCurrentCount({type: 'prev', showCount, childrenLength, loop: props.loop});

        }
        else {
            setSwipeCount(count - 1);
        }
        prev?.(currentIndex);

    }, [currentIndex, childrenLength, props.loop]);

    const styleCss = useMemo(() => {
        const { icon } = iconWidthPadding;
        return {
            '--background-color': props.bgColor ?? icon?.bgColor,
            '--hover-background-color': props.hoverBgColor ?? icon?.hoverBgColor,
            '--box-shadow': props.boxShadow ?? icon?.boxShadow,
            '--hover-box-shadow': props.hoverBoxShadow ?? icon?.hoverBoxShadow
        } as CSSProperties;

    }, [iconWidthPadding, props.bgColor, props.hoverBgColor, props.boxShadow, props.hoverBoxShadow]);
    const childrenContainer = useMemo(() => {
        return {
            '--translate-x': suffixPx(swipeCount * -childrenWidth.current)
        } as CSSProperties;
    }, [swipeCount]);

    return(

        <div className={ classnames(style.carouselButtonWrap, props.className) }>
            <ReoIcon
                name={ iconWidthPadding.icon.left as EIconType }
                width={ iconWidthPadding.width?.[props.size as Size] }
                className={ classnames(
                    `p-${iconWidthPadding.padding?.[props.size as Size]}`,
                    'rounded-100',
                    style.iconStyle,
                    'cursor-pointer',
                    { [style.visibleTransition]: (props.showCount > 0 && currentIndex <= 0) || swipeCount <= 0 },
                    props.iconRightClassName,

                ) }
                color={ props.color ?? iconWidthPadding.icon.color }
                hoverColor={ props.hoverColor ?? iconWidthPadding.icon.hoverColor }
                style={ styleCss }
                onClick={ () => handlePrev(props.showCount, props.prev, swipeCount) }
                ref={ clickPrevRef }
            />
            <div
                className={ classnames(style['children-wrap']) }
                ref={ containerRef }
            >

                <div
                    className={ classnames(style['children-container'], props.childrenClassName) }
                    style={ childrenContainer }
                    ref={ realContentRef }
                >
                    {
                        React.Children.map(props.children,
                            item => {
                                if(!React.isValidElement(item)) {
                                    return null;
                                }
                                return item;
                            }
                        )
                }

                </div>
            </div>
            <ReoIcon
                name={ iconWidthPadding.icon.right as EIconType }
                width={ iconWidthPadding.width?.[props.size as Size] }
                className={ classnames(
                    `p-${iconWidthPadding.padding?.[props.size as Size]}`,
                    'rounded-100',
                    style.iconStyle,
                    'cursor-pointer',
                    {
                        [style.visibleTransition]: (
                            props.showCount > 0
                            && (currentIndex + props.showCount) >= childrenLength
                        )
                        || (
                            (swipeCount + 1) * childrenWidth.current > (realContentRef.current?.clientWidth ?? 0)
                        )
                    },
                    props.iconLeftClassName
                ) }
                color={ props.color ?? iconWidthPadding.icon.color }
                hoverColor={ props.hoverColor ?? iconWidthPadding.icon.hoverColor }
                style={ styleCss }
                ref={ clickNextRef }
                onClick={ () => handleNext(props.showCount, props.next, swipeCount) }
            />
        </div>

    );
};

export default CarouselButton;
