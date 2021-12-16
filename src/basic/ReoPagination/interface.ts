export interface IProps {
    current?: number;
    pageSize?: number;
    total: number;
    showPage?: number;
    onChange?: (current: number) => any;
    className?: string | React.CSSProperties;
}

export interface IRangeItem {
    item: number | string;
    current: number;
    onClick?: (current: number) => void;
    title?: string;
}

export interface IAction {
    type: IActionType;
    active?: number;
}

export type IActionType = 'prev' | 'next' | 'click' | 'preload';

export interface IState {
    showPage: number;
    current: number;
    pageRange: number[]; // 显示范围
    totalPage: number;
}
