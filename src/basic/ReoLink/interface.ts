import { EIconType, PreIconIconProps } from '@/index';
import { CSSProperties } from 'react';
export type Target = '_self' | '_blank' | '_parent' | '_top';
export interface IProps extends PreIconIconProps {
    transition?: boolean; // 默认箭头
    icon?: EIconType; // 可配置箭头
    // iconWidth?: string | number;
    href?: string;
    className?: CSSProperties | string;
    classInnerName?: CSSProperties | string; // ! 自定义a标签里面的文案样式
    fontSize?: string | number;
    children?: React.ReactNode;
    color?: string;
    title?: string; // hover时的提示
    target?: Target;
    underline?: boolean; // 默认为false; 为true时hoverUnderline默认为true
    hoverUnderline?: boolean; // 默认为true
    hoverColor?: string;
    onClick?: () => any;
}
