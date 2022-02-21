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
    float?: boolean;
}

export interface IAction {
    type: 'add' | 'minus' | 'input' | 'init';
    step?: number;
    counter?: number;
}

export type Size = 'large' | 'medium' | 'small';
