import { CSSProperties } from 'react';

export enum EPlacement {
    'TOP_LEFT',
    'TOP_CENTER',
    'TOP_RIGHT',
    'BOTTOM_LEFT',
    'BOTTOM_CENTER',
    'BOTTOM_RIGHT',
    'RIGHT_TOP',
    'RIGHT_MIDDLE',
    'RIGHT_BOTTOM',
    'LEFT_TOP',
    'LEFT_MIDDLE',
    'LEFT_BOTTOM'
}

export type Type = 'singleLine' | 'multiLine';
export type Trigger = 'hover' | 'focus' | 'click';

export interface IProps {
    type?: Type;
    placement?: EPlacement;
    className?: string | CSSProperties;
    contentClassName?: string | CSSProperties;
    children: React.ReactNode;
    content: React.ReactNode;
    trigger?: Trigger;
    backgroundColor?: string;
    showArrow?: boolean; // 在768屏幕尺寸下，隐藏箭头
}

export interface  IOffsetAndProps extends IProps {
    offsetTop?: number;
    offsetLeft?: number;
    visible?: boolean;
    targetWidth?: number | string;
    visibleHandle (visible: boolean): void;
}

export interface IBalloon {
    x: number;
    y: number;
}

export interface IPlacement {
    top: EPlacement[];
    bottom: EPlacement[];
    right: EPlacement[];
    left: EPlacement[];

}

export interface IArrowPoint {
    top: EPlacement[];
    bottom: EPlacement[];
    right: EPlacement[];
    left: EPlacement[];
    middle: EPlacement[];
}
