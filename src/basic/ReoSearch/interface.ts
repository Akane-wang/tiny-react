import { EIconType } from '@/basic/ReoIcon';
import { CSSProperties } from 'react';

export interface IProps {
    placeholder?: string;
    disabled?: boolean;
    width?: number | string;
    size?: 'large' | 'medium' | 'small';
    className?: string | CSSProperties;
    icon?: EIconType;
    iconWidth?: number | string;
    color?: string;
    iconClassName?: string | CSSProperties;
    onChange?: (value: any) => any;
    value?: string;
    name?: string;
    onClick?: (value: string) => any;
}
