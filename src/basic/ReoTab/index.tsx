import React, { useState, CSSProperties, useRef, useEffect, useCallback, useMemo, useReducer } from 'react';
import { IProps, ITabItem, Alignment, TabPosition, IAction, IScroll, ISpaceWidth, IScrollAncestorProps } from './interface';
import classnames from 'classnames';
import { textColor } from './style';
import style from './tab.module.less';
import { suffixPx, getOffSet, getVisualRange } from '@/dom-utils';
import TabItem, { TabBar } from './TabItem';
import ReoSwipe from '@/basic/ReoSwipe';

const defaultProps = {
    tabAlignment: 'left' as Alignment,
    tabPosition: 'top' as TabPosition,
    animated: false,
    tabBarGutter: 20,
    backgroundColor: 'transparent',
    boxShadow: false,
    fullContentArea: false
};

/**
 * 祖先元素是否能完全显示目标元素，若不能，则滚动祖先元素的滚动条以达到将目标元素显示在可视范围内的目的
 * @param {HTMLDivElement | null} targetRef 目标元素
 * @param {HTMLDivElement | null} ancestorRef 祖先元素
 */
function scrollAncestor( scrollAncestorArgs: IScrollAncestorProps ): IScroll {

    const { targetRef, ancestorRef, barGutter, containerRef, prevTransPositionX } = scrollAncestorArgs;
    const scroll = {left: 0, top: 0};
    // 获取祖先定位
    const ancestorPosition = getOffSet(ancestorRef);
    const ancestor = { ancestorLeft: 0, ancestorTop: 0 };

    if(!(targetRef && ancestorRef)) { // 任一不存在

        return { ...scroll, ...{ left: prevTransPositionX }, ...ancestor };

    }

    // 获取祖先的可视范围(相对children定位，包裹整个children后显示部分children的scroll范围)
    const visualRange = getVisualRange(containerRef, ancestorRef);

    // 实际宽度
    const container = getOffSet(containerRef, false, containerRef);

    // 需要根据祖先滚动条获取偏移量
    const target = getOffSet(targetRef, false, containerRef);

    // 如果不存在，返回初始值
    if(!(target && container !== null && ancestorPosition)) {
        return { ...scroll, ...{ left: prevTransPositionX }, ...ancestor };
    }

    /**
     * 情况一：整个目标盒子的长度不超过可视范围，即在可视范围内时，无需滑动滚动条
     */
    if(container.width <= visualRange.width) {
        return { ...scroll, ...{ top: target.top, left: prevTransPositionX }, ...ancestor };
    }

    /**
     * 情况二：(container.width > visualRange.clientWidth)：
     *  如果目标元素长度大于可视范围的长度，则从目标的左边开始显示，不显示其他 */
    //1. 父级盒子的left和top是固定的
    ancestor.ancestorLeft = ancestorPosition?.scrollLeft;
    ancestor.ancestorTop = ancestorPosition?.top;
    scroll.top = container.top;
    scroll.left = container.scrollLeft;

    // 如果有下一个tab时的显示范围为当前可视范围减去当前要显示的目标元素后剩余的十分之一
    const nextBarVisualRange = barGutter + (visualRange.width - target.width) * 0.1;

    // 如果目标元素的长度小于可视范围的长度，目标元素的右边被隐藏，则挪动目标元素的右边到可视范围内，并显示下一级（若存在）
    if(target.scrollRight > visualRange.right) {
        // 目标的宽度 - 显示的距离（窗体宽度 - 目标的left）
        const hiddenRight =  target.scrollRight - visualRange.right; // 滚动条移动的距离应该为目标的被隐藏的宽度 + 如果有下一级时下一级要显示的距离
        scroll.left -= hiddenRight;
        // 判断有下一级时，应该多减去要显示的下一级部分距离
        if ( container.width - target.scrollRight > barGutter) {
            scroll.left -= nextBarVisualRange; // 可视范围减去要显示的内容再额外显示余下内容的百分之10
        }

        // 对于视窗往往某方向挪动的情况，此情景下，tabWrap应该往左边挪动，而视窗往右边挪动了，需要多挪动视窗过来的距离
        scroll.left += prevTransPositionX;
        scroll.top = target.top;
        return { ...scroll, ...ancestor };

    }
    else if (target.scrollLeft < visualRange.left) {

        const hiddenLeft = visualRange.left - target.scrollLeft; // 被隐藏的target距离左边边界的距离
        scroll.left += hiddenLeft;
        if( target.scrollLeft - container.scrollLeft > barGutter ) { // 当前target是否是左边的第一个tab,如果非第一个，则应该再多拖动一段距离

            scroll.left += nextBarVisualRange; // 到这里是计算出来要拖动多少

        }

        // 根据上一次的结果返回计算的结果，即视窗当前值处理拖动后的值的最终结果
        scroll.left += prevTransPositionX;

        scroll.top = target.top;
        return { ...scroll, ...ancestor };
    }

    // TODO：目标盒子超过实际长度，而目标在可视范围内时，计算目标到左右的距离，如果超过barGutter,即可以不用挪动，否则需要挪动一点儿以显示被隐藏的内容
    return { ...scroll, ...{ left: prevTransPositionX, top: target.top }, ...ancestor };
}

// 获取bar的下划线的偏移量
function getActiveBarOffset(init: ISpaceWidth, action: IAction): ISpaceWidth {
    const { swipePositionX, targetRef, ancestorRef, tabBarGutter, containerRef, prevTransPositionX } = action;
    const transform = scrollAncestor({
        targetRef, ancestorRef, barGutter: tabBarGutter, containerRef, prevTransPositionX
    }); // 滚动父级的滚动条
    const container = getOffSet(containerRef);

    const positionRefOffset = getOffSet(targetRef, false, ancestorRef); // 获取正确定位
    const activeBarOffset = {
        // target在可视范围内的left + container被隐藏的left
        left: (positionRefOffset?.left ?? init.left) - (container?.left ?? 0) + swipePositionX,
        width: positionRefOffset?.width ?? init.width,
        transformX: transform.left,
        transformY: transform.top
    };
    return activeBarOffset;
}

// reducer
function barOffsetReducer(state: ISpaceWidth, action: IAction): any {
    switch(action.type) {
        case 'update': return getActiveBarOffset(state, action);
        default: throw new Error('Invalid');
    }
}

const ReoTab: React.FC<IProps> = (props) => {

    const p = useMemo(() => {

        return {...defaultProps, ...props};
    }, [props]);

    /* 初始时tab滚动条的transform位置以及下滑条的left和宽度 */
    const initState = useMemo(() => {
        return {
            left: 0,
            width: 0,
            transformX: 0,
            transformY: 0
        };
    }, []);
    const [barOffset, dispatchBarOffset] = useReducer(barOffsetReducer, initState); // 设置滚动条的滚动距离及tabBar的position

    const positionCss = useMemo(() => {
        return {
            '--left': suffixPx(barOffset.left),
            '--width': suffixPx(barOffset.width)
        } as CSSProperties;
    }, [barOffset]);

    const swipeNodeRef = useRef<any>(null);
    const positionRef = useRef<HTMLDivElement>(null); // active动效下划线获取offset

    const tabWrapRef = useRef<HTMLDivElement>(null);

    const [transPosition, setPosition] = useState(barOffset.transformX);
    // 通过active处理reducer，得到active，left,width,transformX, transformY, 再得到最终的transform的值
    useEffect(() => {

        setPosition(barOffset.transformX);

    }, [barOffset.transformX]);

    const setActiveEffect = useCallback((target, container, transPosition, swipePositionX: number = 0) => {
        dispatchBarOffset({
            type: 'update',
            targetRef: target, // 目标，用于设置底部bar宽度和距离
            ancestorRef: tabWrapRef.current, // 实际宽度
            tabBarGutter: p.tabBarGutter,
            containerRef: container, // 盒子容器
            swipePositionX: swipePositionX,
            prevTransPositionX: transPosition
        });
    }, [p.tabBarGutter]);

    useEffect(() => {

        setActiveEffect(positionRef.current, swipeNodeRef.current, transPosition); //! 不要监听，只是作为一个值输入用于去掉存储其值的变量

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [p.active, setActiveEffect]);

    const handleClick = useCallback((e, item: ITabItem, onChange?: (key: string) => any): void => {
        e.stopPropagation();
        onChange?.(item.value);

    }, []);

    // 重新处理swipeEnd的值
    const handleSwipeEnd = useCallback((left) => {

        setPosition(left);

    }, []);

    const cssStyle = useMemo(() => {
        return {

            '--tab-bar-gutter': suffixPx(p.tabBarGutter),
            '--color': p.color ?? textColor.color,
            '--active-color': p.activeColor ?? textColor.activeColor[p.tabPosition],
            '--hover-color': p.hoverColor ?? (
                props.backgroundColor
                    ? textColor.hoverColor.bgItem
                    : textColor.hoverColor.noBgItem[p.tabPosition]
            )
        } as CSSProperties;
    }, [p.activeColor, p.tabBarGutter, p.color, p.hoverColor, p.tabPosition, props.backgroundColor]);

    const background = useMemo(() => {
        return {

            '--background-color': p.backgroundColor

        } as CSSProperties;
    }, [p.backgroundColor]);
    useEffect(() => {

        // TODO： 这里应该监听resize
        // 会否超过当前视窗能用的最大值
        if (
            tabWrapRef.current && p.tabPosition === 'bottom'
            &&
            (tabWrapRef.current?.parentElement?.clientWidth ?? 0) >= swipeNodeRef.current?.clientWidth
        ) {
            tabWrapRef.current.style.width = 'max-content';
        }
        // 不用处理else, 在此width有默认的width，即为占据版心

    }, [p.tabPosition]);

    const validChildren = useMemo(() => {
        const validRes = React.Children.map(props.children, item => {
            if(!React.isValidElement(item)) {
                return null;
            }
            return (
                <div
                    key={ item.props.value }
                    className={ classnames(
                        style['tab-children'],
                        {
                            [style['must-be-hidden']]: item.props.value !== p.active
                        }
                    ) }
                >
                    { item.props.children }
                </div>
            );
        });

        return validRes;
    }, [p.active, props.children]);

    return (
        <div className={ classnames(
            style['tab-wrap'],
            props.className
        ) }
        >
            <div
                className={ classnames(
                    style['swipe-wrap'],
                    style.background,
                    props.tabsClassName,
                    {
                        [classnames(style.hasBg)]: !!props.backgroundColor,
                        [classnames(style[`hasNoBg-${p.tabPosition}`])]: !props.backgroundColor,
                        [classnames(style.fullContentArea, 'layout')]: p.fullContentArea,
                    },
                ) }
                style={ background }
                ref={ tabWrapRef }
            >
                <ReoSwipe
                    left={ transPosition }
                    onChange={ (left) => handleSwipeEnd(left) }
                >
                    <div
                        className={ style['swipe-children-wrap'] }
                        ref={ swipeNodeRef }
                    >
                        {
                            React.Children.map(props.children, item => {
                                if(!React.isValidElement(item)) {
                                    return null;
                                }
                                return (
                                    <TabBar
                                        onChange={ (e) => handleClick(e, item.props, p.onChange) }
                                        { ...item.props }
                                        backgroundColor={ props.backgroundColor }
                                        tabPosition={ p.tabPosition }
                                        animated={ p.animated }
                                        active={ p.active }
                                        cssStyle={ cssStyle }
                                        ref={ p.active === item.props.value ? positionRef : null } //active === item.props.value
                                    />
                                    );
                            })
                        }
                        <div
                            className={ classnames({
                                [classnames(style.animation)]: p.animated
                            }) }
                            style={ positionCss }
                        >
                        </div>
                    </div>
                </ReoSwipe>
            </div>
            <div className={ style['children-wrap'] }>

                {
                    validChildren
                }
            </div>
        </div>
    );
};

export { IProps, ITabItem, TabItem };
export default ReoTab;
