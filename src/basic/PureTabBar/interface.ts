import { ICarouselButtonProps } from '@/basic/ReoButton';

export interface IPureTabBarProps {
    title: string;
    href: string;
    tabBar: ITabBar[];
    className?: string | React.CSSProperties; // 加给整体的类
}

// 去掉ICarouselButtonProps里与IPureTabBarProps相同的接口
type OmitCarouselButtonProps = Omit<Partial<ICarouselButtonProps>, keyof IPureTabBarProps>;

export type IProps = OmitCarouselButtonProps & IPureTabBarProps;
export interface ITabBar {
    value: string;
    text: string;
    href: string;
}
