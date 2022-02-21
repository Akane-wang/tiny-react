export interface IProps {
    ghost?: boolean; // true ? strokeChecked : fillChecked
    value: string[];
    options: IReoCheckboxOption[];
    children?: React.ReactNode;
    onChange?: (checkedArr: string[]) => any;
    className?: string | React.CSSProperties;
    wrapClassName?: string | React.CSSProperties;
    alignment?: 'left' | 'right' | 'center'; //'justify-start' | 'justify-end' | 'justify-center';
    width?: number | string;
}

export interface IReoCheckboxOption {
    value: string;
    label?: string;
    disabled?: boolean;
    componentFn?: (item: IReoCheckboxOption) => React.ReactElement;
    required?: boolean;
}

export interface ISingleCheckedProps {
    ghost?: boolean; // true ? strokeChecked : fillChecked
    value: boolean;
    children?: React.ReactNode;
    className?: string | React.CSSProperties;
    disabled?: boolean;
    onChange?: (checked: boolean) => any;
    wrapClassName?: string | React.CSSProperties;
    alignment?: 'left' | 'center' | 'right';
    width?: number | string;
    required?: boolean;
}
