import React, {useState, useRef, useEffect, forwardRef, useCallback, useReducer, useMemo, CSSProperties} from 'react';
import { IProps, TOptionKey, IICon, IDropDown, IOption, IUpdateAction, IInitAction } from './interface';
import { getOffSet, getVisualRange, suffixPx } from '@/dom-utils';
import { useScroll, useClickAway } from '@/hooks';
import classNames from 'classnames';
import { selectNum as N } from './style';
import style from './select.module.less';
import { ReoIcon, ReoInput } from '@/index';
import ReactDOM from 'react-dom';
import { getCurrentText, getCurrentOptions, getParentOption, getTarget } from './selectUtils';
import { DropDown } from './selectComponent';
const defaultProps: IProps<TOptionKey> & IICon  = {
    shape: 'square',
    id: '',
    options: [],
    value: '',
    isSearchable: false,
    isLoading: false,
    disabled: false,
    autoComplete: 'off',
    className: '',
    placeholder: '',
    label: false,
    size: 'large',
    width: 330,
    name: 'icon-icon_down-2',
    color: '#777',
    iconWidth: 10,
    fullDropDownWords: false
};

const Portals = forwardRef((props: IDropDown<TOptionKey>, ref) => {

    return ReactDOM.createPortal(
        <DropDown
            { ...props }
            ref={ ref }
        />, document.body);

});

function reducerCurrentOptions(
    currentState: Array<IOption<TOptionKey>>,
    action: IUpdateAction<TOptionKey> | IInitAction<TOptionKey>
): Array<IOption<TOptionKey>> {
    let newState = currentState;
    switch(action.type) {
        case 'update': newState = getCurrentOptions(action.initialState, action.selectedPath, action.searchValue); break;
        case 'init': newState = action.initialState; break;
        default: throw new Error('Invalid dispatch type');
    }
    return newState;
}

const ReoSelect: React.FC<IProps<TOptionKey> & IICon> = (props) => {
    const p = useMemo(() => {
        return {...defaultProps, ...props};
    }, [props]);
    const path = useRef<TOptionKey[]>([]);
    const initSearchVal = useRef<string>('');
    const [selectedPath, setSelectedPath] = useState(path.current);
    const [searchValue, setSearchValue] = useState(initSearchVal.current);
    const initialState = useMemo(() => getCurrentOptions(p.options, path.current, initSearchVal.current), [p.options]);
    const [currentOptions, dispatchCurrentOptions] = useReducer(reducerCurrentOptions, initialState);
    const parentOption = getParentOption(p.options, selectedPath);
    const [ dnVisible, setDnVisible ] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const portalsRef = useRef<HTMLDivElement>(null);
    const dropDownListMaxHeightRef = useRef(
        p.isSearchable
            ? N.ddMaxHeight + N.searchWrapHeight + N.ddSpacing
            : N.ddMaxHeight + N.ddSpacing
    ); // 下拉框所需最大高度（上下边距+搜索框）
    const [offset, setOffset] = useState({
        top: 0, left: 0,
        width: p.width,
        maxHeight: dropDownListMaxHeightRef.current,
        optionsBeTop: false
    });
    const valueRef = useRef(p.value!);
    const textRef = useRef(getCurrentText(p.value!, p.options));
    const inputRef = useRef<HTMLInputElement>(null);

    const dropDownListMinHeightRef = useRef(
        p.isSearchable
            ? N.ddMinHeight + N.searchWrapHeight + N.ddSpacing
            : N.ddMinHeight + N.ddSpacing
    ); // 下拉框所需最小高度（上下额外边距+搜索框）

    // 外部options更新
    useEffect(() => {
        dispatchCurrentOptions({type: 'init', initialState});
    }, [initialState]);

    useEffect(() => {
        textRef.current = getCurrentText(valueRef.current, p.options);
    }, [p.options]);

    useEffect(() => {
        valueRef.current = p.value!;
    }, [p.value]);

    const getOffset = useCallback((): void => {
        // 每次通过focus获取dropdownRef的偏移量，然后传给portals
        const offsetObj= getOffSet(dropdownRef.current, true);

        const defaultOffset = {
            left: 0, top: 0,
            width: dropdownRef.current?.clientWidth,
            maxHeight: dropDownListMaxHeightRef.current,
            optionsBeTop: false
        };

        if(!offsetObj) {
            setOffset(defaultOffset);
            return;
        }
        /* 获取视窗范围 */
        const range = getVisualRange();
        /* 如果超出窗体，则隐藏 */
        if(
            range.top > offsetObj.top
            ||
            (offsetObj.top - (dropdownRef.current?.clientHeight ?? 0) > range.bottom)
        ) {
            setDnVisible(false);
            return;
        }
        // 往上滑动时，下拉框隐藏到视窗以上，超出范围则使用范围的最高top，不存在需要减去下拉框的高度
        offsetObj.top = range.top > offsetObj.top ? range.top : offsetObj.top;
        // 如果select框的底部的高度不够放置下拉框时，下拉框放置到select框上面
        if(offsetObj.bottom <= dropDownListMinHeightRef.current) {

            offsetObj.bottom = dropDownListMaxHeightRef.current;
            // 低于视窗可视范围的最低点，使用可视范围的最低点作为弹窗的底部（offsetObj的top增加了下拉框的高度，即此top是下拉框的top，缺少了下拉框的高度,理应加上）

            offsetObj.top = offsetObj.top - (dropdownRef.current?.clientHeight ?? 0) > range.bottom
                ? range.bottom
                : (dropdownRef.current?.getBoundingClientRect().top ?? 0) + window.pageYOffset;
            // 拿到select框的top的距离，需要减去下拉框的高度，最多减去dropDownListMaxHeightRef.current（在dropdownList组件里减去获取到ref的高度）

            defaultOffset.optionsBeTop = true;
        }
        // select的下拉list的最大高度不能大于dropDownListMaxHeightRef.current
        else if(offsetObj.bottom > dropDownListMaxHeightRef.current) {

            offsetObj.bottom = dropDownListMaxHeightRef.current;

        }
        // 获取到的bottomHeight 介于最小下拉框的高度和最大下拉框的高度之间时，不处理，保持其获取值
        const { bottom, ...rest } = offsetObj;

        setOffset(Object.assign({ ...defaultOffset }, { maxHeight: bottom, ...rest } ));
    }, []);

    /* 设置下拉列表的显示与隐藏， 显示时计算下拉列表的定位（left, top） */
    const handleFocus = useCallback((): void => {
        setDnVisible(!dnVisible);
        inputRef.current?.blur();
        if(dnVisible) {
            return;
        }
        getOffset();
    }, [getOffset, dnVisible]);

    const changeIconState = useCallback((isVisible: boolean): void => {
        if(p.disabled) {
            return;
        }
        setDnVisible(isVisible);
        getOffset();
    }, [getOffset, p.disabled]);

    /* 计算onClick导致的options更新 */
    const onClick = useCallback((keys: TOptionKey[]): void => {

        if(!keys.length) {
            setSelectedPath(path.current);
            setSearchValue(initSearchVal.current);
            dispatchCurrentOptions({type: 'init', initialState});
            return;
        }
        const target = getTarget(p.options, keys[keys.length - 1]);
        if(target?.children) {
            setSelectedPath(keys);
            setSearchValue(initSearchVal.current);
            dispatchCurrentOptions({type: 'update', selectedPath: keys, searchValue: initSearchVal.current, initialState});
        }
        else {
            const currentText = getCurrentText(keys[keys.length - 1], p.options);
            if (currentText) {
                textRef.current = currentText;
                valueRef.current = keys[keys.length - 1];
            }
            setSelectedPath(path.current);
            setDnVisible(false);
            setSearchValue(initSearchVal.current);
            dispatchCurrentOptions({type: 'init', initialState});
            props.onChange?.(valueRef.current);
        }

    }, [p.options, props, initialState]);

    const handleSetClick = useCallback(() => {
        changeIconState(!dnVisible);
    }, [changeIconState, dnVisible]);

    const search = useCallback((value: string): void => {

        setSearchValue(value);
        dispatchCurrentOptions({type: 'update', selectedPath: selectedPath, searchValue: value, initialState});

    }, [selectedPath, initialState]);

    useClickAway(() => {
        if( dnVisible ) {

            setDnVisible(false);

        }

    }, [dropdownRef, portalsRef]);

    // 滚动时重新计算selectOptions的距离
    const position = useScroll(dropdownRef);

    useEffect(() => {
        getOffset();
    }, [position, getOffset]);

    const selectWrapWidthStyle = useMemo(() => {
        return {
            '--width': suffixPx(p.width ?? 'max-content')
        };
    }, [p.width]) as CSSProperties;

    const handleKeysClick = useCallback((keys) => {
        onClick(keys);
    }, [onClick]);

    const memoPortals = useMemo(() => {
        return (
            <Portals
                dnVisible={ dnVisible }
                offsetTop={ offset.top }
                offsetLeft={ offset.left }
                width={ offset.width! }
                maxHeight={ offset.maxHeight }
                optionsBeTop={ offset.optionsBeTop }
                options={ currentOptions }
                parentOption={ parentOption }
                isSearchable={ p.isSearchable! }
                isLoading={ p.isLoading! }
                className={ p.dropDownClassName }
                fullDropDownWords={ p.fullDropDownWords! }
                onClick={ handleKeysClick }
                ref={ portalsRef }
                selectedPath={ selectedPath }
                searchValue={ searchValue }
                onChange={ (searchVal) => search(searchVal) }
                selectedValue={ valueRef.current }
                dropDownMaxHeight={ dropDownListMaxHeightRef.current }
            />
        );
    }, [
        dnVisible,
        offset.top,
        offset.left,
        offset.width,
        offset.maxHeight,
        offset.optionsBeTop,
        currentOptions,
        parentOption,
        p.isSearchable,
        p.isLoading,
        p.dropDownClassName,
        p.fullDropDownWords,
        handleKeysClick,
        selectedPath,
        searchValue,
        search]);

    return (
        <div
            className={ classNames(style.selectWrap, p.className) }
            ref={ dropdownRef }
            style={ selectWrapWidthStyle }
        >
            <ReoInput
                ref={ inputRef }
                id={ p.id }
                value={ textRef.current }
                disabled={ p.disabled }
                onFocus={ handleFocus }
                label={ p.label }
                placeholder={ p.placeholder }
                size={ p.size }
                type={ p.shape === 'round' ? 'grayInput' : 'normalInput' }
                width={ p.width }
                currentState={ p.currentState }
                tips={ p.tips }
                infoMsg={ p.infoMsg }
                inputClassName={ classNames(style.has_icon_set_padding, p.inputClassName) }
            >
                {/* 为select下拉icon占位 */}
                <span className={ classNames(style.iconBgClass) }>
                    <ReoIcon
                        name={ p.name! }
                        width={ p.iconWidth }
                        color={ p.color }
                        className={ classNames(
                            {
                                [classNames(style.hasSelectListClass)]: dnVisible
                            },
                            style.iconClass
                        ) }
                        onClick={ handleSetClick }
                    />
                </span>
            </ReoInput>

            <ReoInput
                value={ p.value }
                autoComplete={ p.autoComplete }
                className='must-be-hidden'
            />

            {
                // 不需要显示时不要生成，以便处理挂载顺序不对导致的层级问题
                dnVisible ? memoPortals : null
            }
        </div>
    );
};

export default ReoSelect;
