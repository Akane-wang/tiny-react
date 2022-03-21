export interface IProps {
    children: React.ReactNode;
    className?: string; // 内容区容器样式
    static?: boolean; // 是否为position: static
    mask?: boolean; // 是否有遮罩
    center?: boolean; // 是否屏幕居中
    pcAnimation?: boolean; // pc端是否从左边展开弹窗
    mobileAnimation?: boolean; // 移动端是否从底部展开弹窗
    onClose?: () => void;
}
