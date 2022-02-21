export interface IProps {
    value?: string;
    onChange?: (value: string) => any;
    onBlur?: (event: string) => any;
    label?: boolean;
    resize?: Resize;
    tips?: Tips;
    placeholder?: string;
    disabled?: boolean;
    infoMsg?: string | React.ReactNode;
    className?: string | React.CSSProperties;
    autoComplete?: string;
    width?: string | number;
    height?: string | number;
    required?: boolean; // 给星星表示该textarea必须被填写
    onKeyUp?: (event: any) => any;
    onKeyPress?: (event: any) => any;
}

export type Tips = 'error' | 'success' | 'warning' | 'info' | 'normal';
export type Resize = 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
