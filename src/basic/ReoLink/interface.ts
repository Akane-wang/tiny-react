import { EIconType } from '@/basic/ReoIcon';
import { CSSProperties } from 'react';
export interface IProps {
    transition?: boolean;
    icon?: EIconType;
    iconWidth?: string | number;
    href?: string;
    className?: CSSProperties | string;
    classInnerName?: CSSProperties | string; // ! 自定义a标签里面的文案样式
    fontSize?: string | number;
    children?: React.ReactNode;
    color?: string;
    title?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    underline?: boolean;
    hoverColor?: string;
    onClick?: () => any;
}
