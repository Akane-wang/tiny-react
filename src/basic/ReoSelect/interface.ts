import React from 'react';
import { EIconType, CurrentState, TipState, Size, Shape } from '@/index';
export interface IDropDown<T> extends IOptionsList<T> {
    dnVisible: boolean;
    optionsBeTop: boolean; // options列表是否应该在select框上面
    offsetTop: number;
    offsetLeft: number;
    width: number | string;
    isLoading: boolean;
    searchValue: string;
    onChange?: (searchVal: string) => any;
    className?: string | React.CSSProperties;
    dropDownMaxHeight: number; // 下拉框最大高度（固定）
}

export interface IProps<T> {
    shape?: Shape; // 默认normal,且现在不再设置圆框
    fullDropDownWords?: boolean; // 下拉文案显示全
    id?: string;
    options: Array<IOption<T>>; // options 作为数组传入，以实现列表项的按序排列
    value?: T;
    isSearchable?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    className?: string | React.CSSProperties;
    dropDownClassName?: string | React.CSSProperties; // dropDown下拉列表上的css类
    inputClassName?: string | React.CSSProperties; // input框的class类
    placeholder?: string;
    label?: boolean;
    onChange?: (value: T) => any;
    size?: Size;
    width?: string | number;
    currentState?: CurrentState;
    tips?: TipState;
    infoMsg?: string | React.ReactNode;
}

export interface IICon {
    name?: EIconType; // 'icon_down-2',
    color?: string; // #777
    iconWidth?: string | number; // 10
}

export interface IInnerOption<T> extends IOption<T> {
    dataKey: T;
    className?: string | React.CSSProperties;
    backParent: boolean;
    onClick?: (setItem: T) => any;
    selected: boolean;
    fullDropDownWords: boolean;
}

export interface IOptionsList<T> {
    maxHeight: number | string;// select框的最大高度（处理在底部时高度不够导致滚动条出现的情况）
    options: Array<IOption<T>>;
    onClick?: (setItem: T[]) => any;
    selectedPath: T[];
    parentOption: IOption<T> | null;
    selectedValue: T;
    isSearchable: boolean;
    fullDropDownWords: boolean;
}

export interface IOption<T> {
    key: T;
    text: React.ReactNode | string;
    disabled?: boolean;
    hocRender?: React.ReactElement;
    children?: Array<IOption<T>>;
}

export interface IUpdateAction<T> {
    type: 'update';
    selectedPath: T[];
    searchValue: string;
    initialState: Array<IOption<T>>;
}

export interface IInitAction<T> {
    type: 'init';
    initialState: Array<IOption<T>>;
}

export type TOptionKey = string | number;
