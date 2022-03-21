import React, { useState, useRef, useEffect, useCallback, useMemo, forwardRef, useImperativeHandle } from 'react';
import { IProps, ITabBar, IDropDownListProps, ISelectProps } from './interface';
import { ReoButton, ReoLink, ReoSelect, ReoIcon } from '@/index';
import { useClickAway, useResize } from '@/hooks';
import classnames from 'classnames';
import style from './tab.module.less';
import './tab.less';
import config from './style';

const DropDownList = forwardRef((props: IDropDownListProps, ref) => {
    const dropRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => {
        return dropRef.current;
    });
    return (
        <div
            className={ classnames(
                style.tab_list,
                {
                    ['must-be-hidden']: !props.visible
                },
                props.className
            ) }
            ref={ dropRef }
        >
            {
                props.tabBarList.map((item, index) => {
                    return (
                        <a
                            href={ item.href }
                            data-value={ item.value }
                            key={ item.value }
                            className={ classnames(
                                style['tab-bar-show-more-list'],
                                {
                                    ['must-be-hidden']: index <= props.endActiveIndex
                                }
                            ) }
                            data-id={ index }
                        >
                            { item.text }
                        </a>
                    );
                })
            }
        </div>
    );
});

const SelectLink: React.FC<ISelectProps> = (props) => {
    const handleClick = useCallback((href) => {

        location.href = href;

    }, []);
    return (
        <div
            className={ classnames(
                style.link_class,
                {
                    [style.disabled_link]: props.disabled
                }
            ) }
            onClick={ () => handleClick(props.href) }
        >
            { props.text }
            <ReoIcon
                color={ props.disabled ? config.selectLinkDisabledIconColor : config.selectLinkIconColor }
                name={ 'icon-icon_arrow-right' }
                width={ config.selectLinkIconWidth }
                hoverColor={ config.selectLinkIconHoverColor }
            />
        </div>
    );
};

const PureTabBar: React.FC<IProps> = (props): React.ReactElement => {
    const [visible, setVisible] = useState(false); // showMore 按钮显示与否取决于activeEndIndex的值是否小于tabList的长度
    const [endActiveIndex, setEndActivwIndex] = useState(props.tabBar.length); // 一开始全放出来
    const { widthOfWindow } = useResize();
    const titleRef = useRef<HTMLAnchorElement>();
    const titleWidthRef = useRef<number>(); // title文案宽度
    const buttonRef = useRef<HTMLButtonElement>();
    const buttonWidthRef = useRef<number>();
    const linkListRef = useRef<HTMLDivElement>(null);
    const linkListWidthRef = useRef<number[]>();
    const dropDownRef = useRef<HTMLDivElement>(null);

    // 执行一次，主要目的是获取title,边距和tabs所占据的宽度
    useEffect(() => {

        titleWidthRef.current = titleRef.current?.clientWidth;
        buttonWidthRef.current = buttonRef.current?.clientWidth;
        const tempLinkWidthList = [];
        if(props.tabBar.length) {
            let index = 0;

            while(index < props.tabBar.length) {
                const temp = (
                    linkListRef.current?.childNodes as NodeListOf<HTMLDivElement>
                )[index].clientWidth + config.bar1280Spacing;
                tempLinkWidthList.push(temp);
                index++;
            }

        }
        linkListWidthRef.current = tempLinkWidthList.slice(0);

    }, [props.tabBar.length]);

    // 根据视窗的宽度得出何时应该显示showMoreButton,以及显示的tab个数和隐藏个数
    useEffect(() => {
        if(widthOfWindow >= 1280) {
            let index = 0, temp = 0;
            const unknownWidth =
            1200
            - config.bar1280DistanceBetweenTitleAndBarList
            - (titleWidthRef.current ?? 0)
            - (buttonWidthRef.current ?? 0); // 实际给tab的宽度
            while(index < props.tabBar.length) {
                if(temp < unknownWidth) {
                    temp += linkListWidthRef.current?.[index] ?? 0;

                }
                else {
                    setEndActivwIndex(index);
                    break;
                }
                index++;

            }
        }
    }, [props.tabBar.length, widthOfWindow]);

    const handleShowMoreOrLess = useCallback((): void => {
        setVisible(!visible);
    }, [visible]);

    const hocRender = (value: ISelectProps): React.ReactElement => {
        return (<SelectLink { ...value } />);
    };

    const options = useMemo(() => {
        return props.tabBar.map(item => {
            const { text, ...rest } = item;
            return {
                key: item.value,
                hocRender: hocRender(item),
                text: text,
                className: classnames(style.drop_down_li, 'drop_down_li'),
                ...rest
            };
        });
    }, [props.tabBar]);

    useClickAway(() => {
        if(visible) {
            setVisible(false);
        }
    }, [dropDownRef]);

    return (
        <div className={ classnames(style['tab-wrap']) }>
            {/* 1280以上显示，否则隐藏 */}
            <div className={ classnames('main-container', style['tab-content'], props.className) }>
                <ReoLink
                    className={ classnames(style['tab-title']) }
                    classInnerName={ classnames(style.tab_inner_title) }
                    href={ props.href }
                    underline={ false }
                    hoverColor={ '#333' }
                    ref={ titleRef }
                >
                    { props.title }
                </ReoLink>
                <div
                    className={ classnames(style['tab-bar-wrap']) }
                    ref={ linkListRef }
                >
                    {
                        props.tabBar.map((item, index) => {
                            return (
                                <a
                                    href={ item.href }
                                    data-value={ item.value }
                                    key={ item.value }
                                    className={ classnames(
                                        style['tab-bar'],
                                        {['must-be-hidden']: index > endActiveIndex}
                                    ) }
                                    data-id={ index }
                                >
                                    { item.text }
                                </a>
                            );
                        })
                    }
                    <div className={ style.show_more_container }>

                        <ReoButton
                            className={ classnames(
                                style.show_more_button,
                                { // 1280以上显示着的Index的个数必须小于tab总数才能显示showMore
                                    ['must-be-hidden']: endActiveIndex > props.tabBar.length
                                }
                            ) }
                            iconClassName={ classnames(style.button_icon, {
                                [style.rotate_icon]: visible
                            }) }
                            type={ 'link' }
                            icon={ 'icon-icon_arrow-down' }
                            iconColor={ '#00ade5' }
                            onClick={ handleShowMoreOrLess }
                            ref={ buttonRef }
                        >
                            { props.showMore }
                        </ReoButton>
                        <DropDownList
                            ref={ dropDownRef }
                            visible={ visible }
                            tabBarList={ props.tabBar }
                            endActiveIndex={ endActiveIndex }
                        />
                    </div>

                </div>
            </div>
            {/* 1280以下显示，否则隐藏 */}
            <div className={ style.pure_tab_wrap }>
                <ReoSelect
                    options={ options }
                    width={ '100%' }
                    className={ classnames(style.select_list_minin_1280, style.select_class) }
                    inputClassName={ style.input_select }
                    dropDownClassName={ classnames(style.drop_down_classname, 'drop_down_classname') }
                    name={ 'icon-icon_arrow-down' }
                >

                </ReoSelect>

            </div>
        </div>
    );
};

export {
    IProps,
    ITabBar
};

export default PureTabBar;
