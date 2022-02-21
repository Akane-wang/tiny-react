export interface IProps {
    message?: string | React.ReactNode;
    type: 'success' | 'warning' | 'error' | 'original' | 'countdown' | 'notice';
    children?: React.ReactNode;
}
