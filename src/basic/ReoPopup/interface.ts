export interface IProps {
    children: React.ReactNode;
    class?: string; // 内容区容器样式
    static?: boolean; // 是否为position: static
    mask?: boolean; // 是否有遮罩
    onOutsideClick?: () => void; // 弹窗内容除外区域的点击事件
}
