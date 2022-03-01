import { IProps as IIconProps } from '@/basic/ReoIcon';

export interface IProps extends Partial<IIconProps> {
    className?: string | React.CSSProperties;
    rate?: number; // 默认为0
    disabled?: boolean; //是否可编辑
    onClick?: (rate: number) => any;
    iconClassName?: string | React.CSSProperties; // 覆盖iconClassName
}
