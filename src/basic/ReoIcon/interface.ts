import { CSSProperties } from 'react';
import { EIconType } from '.';

export interface IPath {
    iconName: EIconType;
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
