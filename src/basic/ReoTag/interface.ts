export interface IProps {
    className?: string | React.CSSProperties;
    value: string;
    onClick?: (value: string | null) => any;
}
