import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IProps, IRangeItem, IState, IActionType } from './interface';
import ReoIcon from '@/basic/ReoIcon';
import classnames from 'classnames';
import { iconConfig, disabledIconConfig } from './style';
import style from './paginationConfig.module.less';

const defaultProps = {
    pageSize: 5,
    hideOnSinglePage: false,
    showQuickJumper: false,
    showSizeChanger: true,
    showPage: 5, // 一次显示五页
};

function getNewState(type: IActionType, state: IState, active?: number): IState {
    const resVal = { ...state };
    /* 拿到正确的current值 */
    switch(type) {
        case 'preload':
            if(resVal.current > resVal.totalPage) {
                resVal.current = resVal.totalPage;
            }
            else if(resVal.current < 1) {
                resVal.current = 1;
            }
            // else: 本身
            break;
        case 'prev': resVal.current = resVal.current - 1; break;
        case 'next': resVal.current = resVal.current + 1; break;
        case 'click':
            if(active! < 1) {
                resVal.current = 1;
            }
            else if (active! > resVal.totalPage) {
                resVal.current = resVal.totalPage;
            }
            else {
                resVal.current = active!;
            }
            break;
        default: throw new Error('Invalid type');
    }

    /* range的最大最小值范围不能大于totalPage,小于1，且俩边界一定存在，所以range的极限值应为[2, totalPage-1] */
    const actualMin = resVal.current - Math.floor((resVal.showPage - 1) / 2);
    let rangeFirst =  actualMin <= 1 ? 1 : actualMin; // 显示最小值（不得小于1）
    const actualMax = resVal.current + resVal.showPage - 1 - Math.floor((resVal.showPage - 1) / 2);
    let rangeLast = actualMax >= resVal.totalPage ? resVal.totalPage : actualMax; // 显示最大值(不得大于总页数)

    /* 若任一边界值不正常，理应从另一边界值补充，以确保显示值为showPage个 */
    if(actualMin !== rangeFirst || actualMax !== rangeLast) {
        // 两种情况，实际最小值小于边界最小值(是否要包括边界1) || 实际最大值大于边界最大值
        if(actualMin < rangeFirst) {
            const temp = rangeLast + rangeFirst - actualMin;
            rangeLast = temp >= resVal.totalPage ? resVal.totalPage : temp;
        }
        else if (actualMax > rangeLast) {
            const temp =  (rangeFirst - (actualMax - rangeLast));
            rangeFirst = temp <= 1 ? 1 : temp;
        }
    }
    resVal.pageRange = [];
    const tempRange: number[] = [];
    let temp = rangeFirst === 1 ? 2 : rangeFirst; // 1不用渲染
    rangeLast = rangeLast === resVal.totalPage ? resVal.totalPage - 1 : rangeLast; // 最大边界值不用渲染

    while (temp <= rangeLast) {
        if (!tempRange.includes(temp)) {

            tempRange.push(temp);

        }
        temp++;
    }
    resVal.pageRange = Array.from(new Set(tempRange)).sort((a, b) => a - b); // 排序
    return resVal;
}

/* 页item，点点点 */
const RangeItem: React.FC<IRangeItem> = (props) => {
    const handleClick = useCallback(() => {
        props.onClick?.(typeof props.item === 'number' ? props.item : props.current);
    }, [props]);
    return (
        <div
            className={ classnames(
                style.pageRangeContainer,
                {
                    [style['active-wrap']]: props.current === props.item
                }
            ) }
            onClick={ handleClick }
        >
            <span
                className={ classnames(
                    style.pageRange,
                    { [classnames(style.active)]: props.current === props.item }
                ) }
                title={ props.title }
            >
                { props.item }
            </span>
        </div>
    );
};

const ReoPagination: React.FC<IProps> = (prop) => {

    const pageSize = useMemo(function() {

        return prop.pageSize ?? defaultProps.pageSize;

    }, [prop]);

    const showPage = useMemo(function() {

        return prop.showPage ?? defaultProps.showPage;

    }, [prop]);

    /* 获取pagination的页数 */
    const totalPage = useMemo(() => {
        // total为0时totalPage理应为1

        if(prop.total) {

            return Math.ceil(prop.total / pageSize);

        }
        else {
            return 1;
        }

    }, [prop, pageSize]);

    // 触发外部onChange
    const handleChangeCurrent = useMemo(function() {

        return function handle(current: number) {

            prop.onChange?.(current);
        };
    }, [prop]);

    const [pageRange, setPageRange] = useState<number[]>([]);

    // 下一页
    const handleChange = useCallback((type: IActionType, nextCurrent?: number) => {

        let result;

        if (type === 'click') {

            result = getNewState(
                type,
                {
                    current: prop.current,
                    pageRange: [],
                    showPage: showPage,
                    totalPage: totalPage
                },
                nextCurrent
            );
        }
        else {

            result = getNewState(
                type,
                {
                    current: prop.current,
                    pageRange: [],
                    showPage: showPage,
                    totalPage: totalPage
                }
            );
        }

        handleChangeCurrent(result.current);
        setPageRange(result.pageRange);

    }, [handleChangeCurrent, prop, showPage, totalPage]);

    useEffect(() => {

        handleChange('preload');

    }, [handleChange]);

    /* 点击（某页 || 往前/往后跳转showPage页）触发事件 */
    const handleClick = useCallback((active) => {

        handleChange('click', active);

    }, [handleChange]);

    const handlePrev = useCallback(() => {
        handleChange('prev');

    }, [handleChange]);

    const handleNext = useCallback(() => {

        handleChange('next');

    }, [handleChange]);

    return (
        <div className={ classnames('pagination-container', style.paginationContainer, prop.className) }>
            <ReoIcon
                name={ 'icon-icon_arrow-left' }
                onClick={ handlePrev }
                { ...iconConfig }
                color={ (prop.total === 0 || prop.current === 1) ? disabledIconConfig.color : undefined }
                className={
                    classnames(
                        style.iconStyle,
                        style.iconLeft,
                        { [classnames(style.disabled)]: prop.total === 0 || prop.current === 1 }
                )
            }
            />
            <RangeItem
                item={ 1 }
                current={ prop.current }
                onClick={ (active) => handleClick(active) }
            />
            {/* 点点点 */}
            {
                pageRange[0] - 1 > 1
                    ? (
                        <RangeItem
                            item={ '...' }
                            current={ prop.current }
                            onClick={ active => handleClick(active - showPage) }
                        />
                    )
                    : null
            }
            {
                pageRange.map((item: number) => {
                    return (
                        <RangeItem
                            key={ item }
                            item={ item }
                            current={ prop.current }
                            onClick={ (active) => handleClick(active) }
                        />
                    );

                })
            }
            {/* 点点点 */}
            {
                pageRange[pageRange.length - 1] + 1 < totalPage
                    ? (
                        <RangeItem
                            item={ '...' }
                            current={ prop.current }
                            onClick={ active => handleClick(active + showPage) }
                        />
                    )
                    : null
            }
            {
                totalPage > 1
                    ? (
                        <RangeItem
                            item={ totalPage }
                            current={ prop.current }
                            onClick={ (active) => handleClick(active) }
                        />
                    )
                    : null
            }
            <ReoIcon
                name={ 'icon-icon_arrow-right' }
                onClick={ handleNext }
                { ...iconConfig }
                color={ (prop.total === 0 || prop.current === totalPage) ? disabledIconConfig.color : undefined }
                className={
                    classnames(
                        style.iconStyle,
                        style.iconRight,
                        { [classnames(style.disabled)]: prop.total === 0 || prop.current === totalPage }
                )
            }
            />
        </div>
    );
};

export default ReoPagination;
export { IProps };
