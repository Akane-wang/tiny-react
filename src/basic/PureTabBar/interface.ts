export interface IProps {
    title: string;
    tabBar: ITabBar[];
    className?: string | React.CSSProperties; // 加给整体的类
}
export interface ITabBar {
    value: string;
    text: string;
    href: string;
}
