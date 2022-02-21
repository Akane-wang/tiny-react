import React from 'react';
export interface IProps {
    className?: string | React.CSSProperties; // 加给整体的类
    // separator?: string; // 分隔符（未用到）
    active: string; // 当前key
    tabsClassName?: string | React.CSSProperties; // tab的类
    // childrenClassName?: string; // 给children增加类
    // textAlignmentClassName?: string;
    onChange?: (key: string) => any;
    tabPosition?: TabPosition;
    animated?: boolean;
    tabAlignment?: Alignment;
    tabBarGutter?: number;
    // tabBarClassName?: string;
    backgroundColor?: string;
    boxShadow?: boolean;
    fullContentArea?: boolean; // ?是否占满版心
    color?: string;
    hoverColor?: string;
    activeColor?: string;
    children:  React.ReactElement<ITabItem> | Array<React.ReactElement<ITabItem>>;
}

export interface ITabItem {
    value: string;
    text: string;
    className?: string | React.CSSProperties; // 给tab的children增加类
    tabClassName?: string | React.CSSProperties; // 给tab的bar增加类
    textAlignmentClassName?: string | React.CSSProperties; // children的布局（left /right /center）
    children?: React.ReactNode;
}

export interface ITabBar {
    backgroundColor?: string;
    animated?: boolean;
    tabPosition?: TabPosition;
    active: string; // 当前key
    onChange?: (key: React.ReactNode) => any;
    cssStyle?: React.CSSProperties;
}

export type Alignment = 'left' | 'right' | 'center';

export type TabPosition = 'top' | 'bottom';

export interface IAction {
    state?: ISpaceWidth;
    type: 'update';
    targetRef: HTMLDivElement | null;
    ancestorRef: HTMLDivElement | null;
    tabBarGutter: number;
    containerRef: HTMLDivElement | null;
    swipePositionX: number;
    prevTransPositionX: number;
}

export interface IScroll {
    left: number;
    top: number;
    ancestorLeft: number;
    ancestorTop: number;
}
export interface ISpaceWidth {
    left: number;
    width: number;
    transformX: number;
    transformY: number;
}

export interface IScrollAncestorProps {
    targetRef: HTMLDivElement | null;
    ancestorRef: HTMLDivElement | null;
    barGutter: number;
    containerRef: HTMLDivElement | null;
    prevTransPositionX: number;
}
