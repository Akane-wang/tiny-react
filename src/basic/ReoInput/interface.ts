import { CSSProperties, ReactNode } from 'react';
import { EIconType, TOptionKey, PreIconIconProps, Size } from '@/index';

export interface IProps extends PreIconIconProps {
    type?: Types;
    tips?: TipState;
    icon?: EIconType;
    // iconWidth?: number | string;
    loading?: boolean;
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
    value?: TOptionKey;
    id?: string;
    width?: number | string;
    currentState?: CurrentState;
    infoMsg?: string | ReactNode;
    onChange?: (value: string) => any;
    label?: boolean;
    onBlur?: () => any;
    children?: React.ReactNode;
    className?: string | CSSProperties;
    inputClassName?: string | CSSProperties; // 作用于input本身
    onFocus?: () => any;
    autoComplete?: string;
    name?: string;
    backgroundColor?: string;
    color?: string;
    infoMsgColor?: string;
}

export type Types = 'normalInput' | 'darkInput' | 'lightInput' | 'grayInput' | 'searchInput' | 'blueIconSearch';
export type TipState = 'error' | 'success' | 'warning' | 'info';
export type CurrentState = 'normal' | 'inputing' | 'error' | 'succeeded';
