export interface IProps {
    type?: Type;
    onClick?: () => any;
    className?: string | React.CSSProperties;
    size?: Size;
}

export type Type = 'play' | 'replay';
export type Size = 'large' | 'medium' | 'small';
