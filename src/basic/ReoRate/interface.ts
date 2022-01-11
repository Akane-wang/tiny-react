export interface IProps {
    className?: string | React.CSSProperties;
    rate?: number; // 默认为0
    disabled?: boolean; //是否可编辑
    onClick?: (rate: number) => any;
}
