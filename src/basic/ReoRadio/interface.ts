export interface IProps {
    value?: string; // 不选择的时候
    options: IOptions[];
    onChange?: (value: string) => any;
    className?: string | React.CSSProperties;
    id?: string;
    alignment?: 'left' | 'right' | 'center';
}

export interface IOptions {
    value: string;
    label?: string;
    disabled?: boolean;
    checked?: boolean;
    componentFn?: (item: IOptions) => React.ReactElement;
}

export interface ISingleProps {
    value: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string | React.CSSProperties;
    onChange?: (value: boolean) => any;
    id?: string;
}
