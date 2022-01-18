import { ICarouselButtonProps } from '@/basic/ReoButton';
import { CSSProperties } from 'react';
export interface IDataSource {
    rowTitle: string;
    [k: string]: string;
}
export interface IProps extends Partial<ICarouselButtonProps> {
    className?: string | CSSProperties;
    tableColumnClassName?: string | CSSProperties; // 首行样式
    tableDataClassName?: string | CSSProperties; // data行样式
    tableNote?: string;
    dataSource: IDataSource[]; // 显示数据： 数据显示类型
    // 对齐方式： 居中
    columns: IColumns[];
    loading?: boolean; // 表格是否在loading状态
    scroll?: Record<'x'| 'y', number>; // 配置表格的宽高，以确定具体内容是否填充完整，超出是否要滚动，不设置则默认为填充内容的宽高
    useCarouselButton?: boolean; //是否使用carouselButton切换, 默认使用
}

export interface IColumns {
    value: string; // 唯一路径标识
    title: string;
    width?: number;
    // key: string; // 同value
}
