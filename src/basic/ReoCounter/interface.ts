import { Size } from '@/index';
export default interface IProps {
    size?: Size;
    disabled?: boolean;
    bordered?: boolean;
    step?: number;
    value: number;
    onChange?: (value: any) => any;
    maxValue?: number;
    minValue?: number;
    className?: string | React.CSSProperties;
    float?: boolean; // input框，不能输入小数点，float为false时
}

export interface IAction {
    type: 'add' | 'minus' | 'input' | 'init';
    step?: number;
    counter?: number;
}
