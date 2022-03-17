import { CSSProperties } from 'react';
import { EIconType } from '@/index';

export interface IPath {
    name: EIconType;
    width: number | string;
    height?: number | string;
    color: string;
    className?: string | CSSProperties;
    style?: CSSProperties;
    hoverColor?: string;
    display?: 'inline-flex';
    onClick?: (e: any) => any;
    onMouseEnter?: (e: any) => any;
    onMouseLeave?: (e: any) => any;
}

export interface IProps {
    name: EIconType;
    width?: number | string;
    height?: number | string;
    color?: string;
    className?: string | CSSProperties;
    style?: CSSProperties;
    hoverColor?: string;
    onClick?: (e: any) => any;
    onMouseEnter?: (e: any) => any;
    onMouseLeave?: (e: any) => any;
}

// 键重映射
type AddPreIconProps<T1> = { [P in keyof T1 & string as `icon${Capitalize<P>}`]?: T1[P] };

export type PreIconIconProps = AddPreIconProps<IProps>;
