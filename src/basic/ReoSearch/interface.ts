import { EIconType } from '@/basic/ReoIcon';

export interface IProps {
    placeholder?: string;
    disabled?: boolean;
    width?: number | string;
    size?: 'large' | 'medium' | 'small';
    className?: string;
    icon?: EIconType;
    iconWidth?: number | string;
    color?: string;
    iconClassName?: string;
    onChange?: (value: any) => any;
    value?: string;
    name?: string;
    onClick?: (value: string) => any;
}
