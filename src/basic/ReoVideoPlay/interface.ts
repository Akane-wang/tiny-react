import { Size } from '@/index';
export interface IProps {
    type?: Type;
    onClick?: () => any;
    className?: string | React.CSSProperties;
    size?: Size;
}

export type Type = 'play' | 'replay';
