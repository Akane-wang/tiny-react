import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { IProps, IRangeItem, IAction, IState, IActionType } from './interface';
import ReoIcon from '../ReoIcon';
import classnames from 'classnames';
import { iconConfig, disabledIconConfig } from './style';
import style from './paginationConfig.module.less';

const defaultProps = {
    current: 1,
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
        case 'preload': break;
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

function paginationReducer(state: IState, action: IAction): any {

    switch(action.type) {
        case 'preload': return getNewState(action.type, {...state, ...action.state});
        case 'prev':
        case 'next': return getNewState(action.type, state);
        case 'click': return getNewState(action.type, state, action.active);
        default: throw new Error('Invalid type');
    }
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
                className={ classnames(style.pageRange,
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

    const props = useMemo(() => {
        return {...defaultProps, ...prop};
    }, [prop]);

    /* 获取pagination的页数 */
    const totalPage = useMemo(() => {
        return Math.ceil(props.total / props.pageSize);
    }, [props]);

    /* 设置pagination属性初始值 */
    const initState = useMemo(() => {
        return {
            current: props.current, // 当前页
            pageRange: [], // 显示范围
            totalPage, // 总页数
            showPage: props.showPage, // 一次显示多少页
        };
    }, [props, totalPage]);

    /* reducer */
    const [ paginationConfig, dispatchPagination ] = useReducer(paginationReducer, initState);
    useEffect(() => {
        dispatchPagination({type: 'preload', state: initState});
    }, [initState]);
    useEffect(() => {
        prop.onChange?.(paginationConfig.current);
    }, [paginationConfig, prop]);
    // 上一页
    const handlePrev = useCallback(() => {
        if(paginationConfig.current === 1) {
            return;
        }
        dispatchPagination({ type: 'prev' });
    }, [paginationConfig]);

    // 下一页
    const handleNext = useCallback(() => {
        if(paginationConfig.current === totalPage) {
            return;
        }
        dispatchPagination({ type: 'next' });
    }, [paginationConfig, totalPage]);

    /* 点击（某页 || 往前/往后跳转showPage页）触发事件 */
    const handleClick = useCallback((active) => {
        dispatchPagination({ type: 'click', active: active });
    }, []);

    return (
        <div className={ classnames('pagination-container', style.paginationContainer, props.className) }>
            <ReoIcon
                name={ 'icon-icon_arrow-left' }
                onClick={ handlePrev }
                { ...iconConfig }
                color={ paginationConfig.current === 1 ? disabledIconConfig.color : undefined }
                className={ classnames(style.iconStyle,
                    style.iconLeft,
                    { [classnames(style.disabled)]: paginationConfig.current === 1 }
                ) }
            />
            <RangeItem
                item={ 1 }
                current={ paginationConfig.current }
                onClick={ (active) => handleClick(active) }
            />
            {/* 点点点 */}
            {
                paginationConfig.pageRange[0] - 1 > 1
                    ? (
                        <RangeItem
                            item={ '...' }
                            current={ paginationConfig.current }
                            title={ `向前${props.showPage}页` }
                            onClick={ active => handleClick(active - props.showPage) }
                        />
                    )
                    : null
            }
            {
                paginationConfig.pageRange.map((item: number) => {
                    return (
                        <RangeItem
                            key={ item }
                            item={ item }
                            current={ paginationConfig.current }
                            onClick={ (active) => handleClick(active) }
                        />
                    );

                })
            }
            {/* 点点点 */}
            {
                paginationConfig.pageRange[paginationConfig.pageRange.length - 1] + 1 < totalPage
                    ? (
                        <RangeItem
                            item={ '...' }
                            current={ paginationConfig.current }
                            title={ `向后${props.showPage}页` }
                            onClick={ active => handleClick(active + props.showPage) }
                        />
                    )
                    : null
            }
            {
                totalPage > 1
                    ? (
                        <RangeItem
                            item={ totalPage }
                            current={ paginationConfig.current }
                            onClick={ (active) => handleClick(active) }
                        />
                    )
                    : null
            }
            <ReoIcon
                name={ 'icon-icon_arrow-right' }
                onClick={ handleNext }
                { ...iconConfig }
                color={ paginationConfig.current === totalPage ? disabledIconConfig.color : undefined }
                className={ classnames(
                    style.iconStyle,
                    style.iconRight,
                    { [classnames(style.disabled)]: paginationConfig.current === totalPage }
                ) }
            />
        </div>
    );
};

export default ReoPagination;
export { IProps };
