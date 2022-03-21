import React, { useEffect, useRef, CSSProperties, forwardRef, useImperativeHandle, useCallback, useState, useMemo } from 'react';
import classNames from 'classnames';
import style from './select.module.less';
import { selectNum as N } from './style';
import { suffixPx } from '@/dom-utils';
import { ReoIcon, ReoSearch } from '@/index';
import { TOptionKey, IDropDown, IInnerOption, IOptionsList } from './interface';
const Li: React.FC<IInnerOption<TOptionKey>> = (propLi) => {

    const handleClick = useCallback((event: React.MouseEvent<HTMLLIElement>): void => {
        event?.stopPropagation();
        propLi.onClick?.(propLi.dataKey);
    }, [propLi]);
    return (
        <li
            key={ propLi.dataKey }
            value={ propLi.dataKey }
            className={ classNames(
                style.dropDownLi,
                propLi.className,
                propLi.selected ? style.selectedLi : style.normalLi,
                propLi.fullDropDownWords ? style.fullDropDownWordsDropDownLi : style.normalDropDownLi,
                { [classNames(style.disabledClass)]: propLi.disabled }
            ) }
            onClick={ (event) => handleClick(event) }
        >
            {
                propLi.hocRender ?? propLi.text
            }
            {
                propLi.children
                ? (
                    <ReoIcon
                        name={
                            propLi.backParent
                                ? 'icon-icon_arrow-left'
                                : 'icon-icon_arrow-right'
                        }
                        width='12px'
                        color="#777777"
                        className={ classNames( style.iconPositionClass, {
                                [style['right-4']]: !propLi.backParent,
                                [style['left-4']]: propLi.backParent
                            },
                            propLi.fullDropDownWords
                                ? style.fullDropDownWordsIconPositionClass
                                : style.normalIconPositionClass
                        ) }
                    />
                )
                : null
            }
        </li>
    );
};

const List: React.FC<IOptionsList<TOptionKey>> = (props) => {

    const handleClick = useCallback((key: TOptionKey, isBackToParent: boolean = false): void => {

        const selectedPathSlice: TOptionKey[]  = props.selectedPath.slice();

        if( isBackToParent ) {

            selectedPathSlice.pop();

        }
        else {

            // 设置路径
            selectedPathSlice.push(key);

        }
        props.onClick?.(selectedPathSlice);

    }, [props]);

    // maxHeight包括搜索框，下边距宽度（8px）ul宽度为maxHeight - 搜索框 - 下边距宽度
    const maxHeightStyle = useMemo(() => {
        return {
            '--max-height':
            props.isSearchable
                ? suffixPx(parseFloat(props.maxHeight as string) - N.searchWrapHeight - N.ddSpacing)
                : suffixPx(parseFloat(props.maxHeight as string) - N.ddSpacing)
        };
    }, [props.maxHeight, props.isSearchable]) as CSSProperties;

    return (
        <ul
            className={ classNames(style.dropDownUl, 'reoSearchScrollbar') }
            style={ maxHeightStyle }
        >
            {
                props.selectedPath.length && props.parentOption ? (
                    <Li
                        dataKey={ props.parentOption.key }
                        className={ classNames(style.backParentClass) }
                        backParent={ true }
                        onClick={ (key) => handleClick(key, true) }
                        selected={ false }
                        fullDropDownWords={ props.fullDropDownWords }
                        { ...props.parentOption }
                    />
                ) : null
            }
            {
                props.options.map((opt) => {
                    return (
                        <Li
                            dataKey={ opt.key }
                            { ...opt }
                            backParent={ false }
                            onClick={ (key) => handleClick(key) }
                            selected={ props.selectedValue === opt.key }
                            fullDropDownWords={ props.fullDropDownWords }
                            key={ opt.key }
                        />
                    );

                })
            }
        </ul>
    );
};

const DropDown = forwardRef((props: IDropDown<TOptionKey>, ref) => {

    const selectListRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const [offsetTop, setOffsetTop] = useState(
        {
            top: props.optionsBeTop
                ? props.offsetTop - props.dropDownMaxHeight - N.ddSpacing
                : props.offsetTop,
            showDropdown: false
        });

    const setOffset = useCallback(() => {
        if(props.dnVisible) {

            if(props.optionsBeTop) {
                // optionsBeTop前提下 select框超出视窗底部，导致top值大于视窗高度，会有scroll滚动条；处理方式：selectList的底部最多被放置到bottom=0的地方
                setOffsetTop({
                    top: props.offsetTop - (selectListRef.current?.clientHeight ?? 0)
                    - N.ddSpacing,
                    showDropdown: true
                });
            }
            else {

                // 处理视窗有滚动条时select框被向上隐藏连带list框的top值不在可视范围内的问题
                setOffsetTop({
                    top:
                        props.offsetTop + window.pageYOffset < document.body.scrollTop
                            ? document.body.scrollTop
                            : props.offsetTop,
                    showDropdown: true });

            }
        }
    }, [props.dnVisible, props.optionsBeTop, props.offsetTop]);

    useEffect(() => {

        setOffset();

    }, [setOffset]);

    const styleOffset = useMemo(() => {
        return {
            '--left': suffixPx(props.offsetLeft),
            '--top': suffixPx(offsetTop.top),
            '--width': suffixPx(props.width),
            '--max-height': suffixPx( parseFloat(props.maxHeight as string) - N.ddMarginTop ), // 减去上面的边距
        };
    }, [offsetTop.top, props.maxHeight, props.offsetLeft, props.width]) as CSSProperties;

    useEffect(() => {

        searchRef.current?.focus();

    }, [searchRef]);

    useImperativeHandle(ref, () => {
        return selectListRef.current;
    });

    const handleClick = useCallback((keys: TOptionKey[]): void => {
        props.onClick?.(keys);
    }, [props]);

    const handleChange = useCallback((searchVal) => {
        props.onChange?.(searchVal);
    }, [props]);

    return (
        <div
            id="drop-down-wrap"
            className={
                classNames(
                    style.selectOptionWrap,
                    style.offset,
                    props.className,
                    { ['visibility-hidden']: props.optionsBeTop && !selectListRef.current },
                    // 初始时该节点不存在，ref为null，若list由上级确定在select框上面，则先获取top最小时的距离，即list取用最大值计算出top，ref挂载出来时再隐藏hidden
            )
            }
            style={ styleOffset }
            ref={ selectListRef }
        >
            <div className={ style['reoSelectDn'] }>
                {
                    props.isLoading
                    ? (
                        <div className={ classNames(style.loading) }>Loading…</div>
                    )
                    : (
                        <div className={ classNames(style['dropDownList']) }>
                            {
                                props.isSearchable ? (
                                    <ReoSearch
                                        ref={ searchRef }
                                        onChange={ (searchValue) => handleChange(searchValue) }
                                        value={ props.searchValue }
                                        width={ '100%' }
                                        className={ classNames(style.reoSearch) }
                                    />
                                  )
                                    : null
                            }
                            {
                                props.options.length ? (
                                    <List
                                        onClick={ (keys) => handleClick(keys) }
                                        { ...props }
                                    />
                                  ) :
                                    <div className={ classNames(style.noData) }>No Data</div>
                            }
                        </div>
                    )
}
            </div>
        </div>
    );

});

export {
    Li,
    List,
    DropDown
};
