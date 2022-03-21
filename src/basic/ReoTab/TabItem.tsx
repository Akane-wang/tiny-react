import React, { forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { ITabItem, ITabBar } from './interface';
import classnames from 'classnames';
import style from './tab.module.less';
const TabItem: React.FC<ITabItem> = (props) => {
    return (
        <>
            { props }
        </>
    );
};

const TabBar = forwardRef((props: ITabItem & ITabBar, ref) => {
    const positionRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => {
        return positionRef?.current;
    });
    const {value, text, backgroundColor, animated, tabPosition, active, cssStyle, tabClassName } = props;

    const handleClick = useCallback((e) => {
        props.onChange?.(e);
    }, [props]);

    return (
        <div
            key={ value }
            className={ classnames(
                style.item,
                style.spacing,
                style.hoverColor,
                tabClassName,
                { [classnames(style.bgItem)]: !!backgroundColor },
                { [classnames(style[`noBgItem-${ tabPosition }`])]: !backgroundColor },
                { [classnames(animated ? style.activeAnimatedItem : style.activeItem, style.activeColor)]: value === active },
                { [classnames(style.normalItem, style.color)]: value !== active },
            ) }
            onClick={ (e: React.MouseEvent<HTMLDivElement>) => handleClick(e) }
            style={ cssStyle }
            ref={ positionRef }
        >
            { text }
        </div>
    );
});
export {TabBar};

export default TabItem;
