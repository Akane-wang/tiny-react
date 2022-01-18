import { CSSProperties } from 'react';

export interface IProps {
    count?: number; // 显示的内容
    maxCount?: number; // 超出该值则只显示 {maxCount}+
    color?: string; // 背景颜色
    textColor?: string; // 内容颜色
    className?: string | CSSProperties; // 其他自定义样式
    dot?: boolean; // 指定是否只显示一个小圆点
    showZero?: boolean; // 如果 count 为0，默认不显示 badge，可通过此项指定显示
}
