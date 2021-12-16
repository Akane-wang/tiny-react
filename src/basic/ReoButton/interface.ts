import { EIconType } from '@/basic/ReoIcon';

export type Types = 'primary' | 'gradientRedPrimary' | 'linkButton' | 'unset';

export type BorderRadius = 'rounded' | 'square';

export interface IProps {
    type?: Types;
    size?: 'large' | 'medium' | 'small';
    borderRadius?: BorderRadius; // 圆边或者是方边
    loading?: boolean;
    disabled?: boolean;
    ghost?: boolean;
    toggleGhost?: boolean;
    hoverFloat?: boolean;
    lightShadow?: boolean;
    icon?: EIconType;
    iconColor?: string;
    iconHoverColor?: string;
    iconPosition?: 'left' | 'right';
    iconWidth?: number | string;
    iconHeight?: number | string;
    width?: number | string;
    className?: string | React.CSSProperties;
    style?: React.CSSProperties;
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
    children?: React.ReactNode;
    onClick?: (e: any) => any;
}

export interface ICloseProps {
    iconColor?: string;
    size?: Size;
    iconWidth?: number | string;
    width?: number | string;
    height?: number | string;
    buttonColor?: string;
    onClick?: (e?: any) => any;
}

export type Size = 'large' | 'small' | 'medium';

export interface ICarouselButtonProps {
    className?: string;
    childrenClassName?: string; // 作用于children
    iconLeftClassName?: string | React.CSSProperties; // 作用于button
    iconRightClassName?: string | React.CSSProperties; // 作用于button
    next?: (currentIndex: number) => any;
    prev?: (currentIndex: number) => any;
    showCount?: number;// 显示的个数
    initIndex?: number;// 从第几个开始显示默认：0
    loop?: boolean; // 是否结束时要循环按钮
    children: React.ReactNode[] | React.ReactNode;
    boxShadow?: string;
    hoverBoxShadow?: string;
    color?: string;
    borderColor?: string; // 默认和color一样（icon)
    bgColor?: string;
    hoverBgColor?: string;
    hoverBorderColor?: string; // 默认和color一样（icon)
    hoverColor?: string;
    // TODO: 增加接口支持button同比缩放
}

export interface IGhost extends ICarouselButtonProps {
    type: 'ghost';
    size?: Size;
}

export interface IDark extends ICarouselButtonProps {
    type: 'dark';
    size?: 'large' | 'small';
}

export interface ILight extends ICarouselButtonProps {
    type: 'light';
    size?: 'large' | 'small';
}

export interface IUnset extends ICarouselButtonProps {
    type: 'unset';
    size?: Size;
    left: EIconType;
    right: EIconType;
    bgColor: string;
    hoverBgColor: string;
    width?: IWidthPadding;
    padding?: IWidthPadding;

}

export interface IWidthPadding {
    large?: number;
    small?: number;
    medium?: number;
}

export interface IAction {
    type: 'next' | 'prev';
    showCount: number;
    childrenLength: number;
    loop: boolean;
}

export interface IChildrenNode {
    buttonHover: boolean;

}
