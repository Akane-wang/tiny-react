import React, { CSSProperties, useCallback, useImperativeHandle, useRef, useMemo, useState, forwardRef } from 'react';
import { ReoIcon } from '@/index';
import { IProps, IChildrenNode } from './interface';
import { suffixPx } from '@/dom-utils';
import { useResize } from '@/hooks';
import classnames from 'classnames';
import {iconWidth, iconSizeSpace, loadingWidth, loadingHeight, color } from './style';
import style from './button.module.less';

const defaultProps: IProps = {
    type: 'primary',
    size: 'large',
    loading: false,
    disabled: false,
    ghost: false,
    toggleGhost: true,
    hoverFloat: false,
    shape: 'round',
    iconPosition: 'right',
    width: '',
    className: '',
    lightShadow: false
};

const ChildrenNode: React.FC<IProps & IChildrenNode> = (p) => {

    const iconSpace = useMemo(() => {

        return {
            '--icon-space': p.icon?.length ? suffixPx(iconSizeSpace[p.size!]) : 0
        } as CSSProperties;

    }, [p.icon?.length, p.size]);

    const iconColor = useMemo(() => {

        if ( p.disabled ) { // 被禁用

            return p.ghost ? color.ghostDisabled : color.whiteColor;

        }
        else if (p.buttonHover && p.toggleGhost) {

            const tempIconColor = p.iconHoverColor ?? p.iconColor ?? p.color;
            switch(p.type) {

                case 'primary': return tempIconColor ?? (p.ghost ? color.primaryColor : color.whiteColor);
                case 'gradientRedPrimary': return tempIconColor ?? (p.ghost ? color.gradientRedPrimary : color.whiteColor);
                case 'link': return tempIconColor ?? color.primaryColor;
                case 'unset':
                default: return tempIconColor ?? color.whiteColor;

            }

        }

        return p.iconColor
            ?? p.color
            ?? (
                p.ghost
                    ? (
                        p.type === 'primary'
                            ? color.primaryColor
                            : color.gradientRedPrimary
                    )
                    : color.whiteColor
            );

    }, [p.buttonHover, p.color, p.disabled, p.ghost, p.iconColor, p.iconHoverColor, p.toggleGhost, p.type]);

    return (
        <div className={ classnames(
                style.buttonChild,
                style.buttonBaseline,
                style.textWrap,
                { [classnames(style.childrenPosition)]: p.iconPosition === 'right' },
                p.className
        ) }
        >
            {
                p.icon
                    ? (
                        <ReoIcon
                            name={ p.icon }
                            width={ suffixPx(p.iconWidth ?? iconWidth[p.iconPosition!][p.size!]) }
                            height={ suffixPx(p.iconHeight ?? p.iconWidth ?? iconWidth[p.iconPosition!][p.size!]) }
                            color={ iconColor }
                            className={ p.iconClassName }
                        />
                    )
                    : null
            }
            <span
                className={ classnames(style[`icon-${p.iconPosition}`], style.textShow) }
                style={ iconSpace }
            >
                { p.children }
            </span>
        </div>
    );
};

const ReoButton = forwardRef((props: IProps, ref) => {

    const [buttonHover, setButtonHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { widthOfWindow } = useResize();
    const prop = useMemo(() => {

        return { ...defaultProps, ...props };

    }, [props]);

    const unsetButtonStyle = useMemo(() => {

        return {
            backgroundColor: prop.backgroundColor ?? 'transparent',
            borderColor: prop.borderColor ?? 'transparent',
            color: prop.color ?? 'transparent'
        };

    }, [prop.backgroundColor, prop.borderColor, prop.color]);

    /* 外部传入的颜色或者是字体颜色 */
    const cssStyle = useMemo(() => {

        return {
            '--font-color': unsetButtonStyle.color,
            '--background-color': unsetButtonStyle.backgroundColor,
            '--border-color': unsetButtonStyle.borderColor
        } as React.CSSProperties;

    }, [unsetButtonStyle.backgroundColor, unsetButtonStyle.borderColor, unsetButtonStyle.color]);

    useImperativeHandle(ref, () => {

        return buttonRef.current;

    });

    const handleSetButtonHover = useCallback((buttonHover: boolean): void => {
        // * 1280以上才会有hover效果，以下则表示iPad与移动端，无hover效果
        if(widthOfWindow > 1279) {

            setButtonHovered(buttonHover);

        }
    }, [widthOfWindow]);

    const handleClick = useCallback((e) => {

        prop.onClick?.(e);

    }, [prop]);

    return (
        <>
            <button
                type='button'
                onClick={ handleClick }
                disabled={ prop.disabled }
                className={ classnames(
                    style.buttonWrap,
                    style.publicStyle,
                    {
                        [style.buttonStyle]: prop.type === 'unset',
                        [
                            classnames(style[`buttonStyle-${prop.type}`],
                            style[prop.type!])
                        ]: ['primary', 'gradientRedPrimary', 'link'].includes(prop.type!)
                    },
                    style[`size-${prop.size}`],
                    {
                        [classnames(style.hoverFloat)]: prop.hoverFloat,
                        [classnames(style.toggleGhost)]: prop.toggleGhost,
                        [classnames(style.ghost)]: prop.ghost,
                        [classnames(style.loading)]: prop.loading
                    },
                    style[`border-${prop.shape ?? 'round'}`],
                    style[`size-${prop.size}`],
                    prop.className
                ) }
                style={{ ...cssStyle, ...prop.style }}
                onMouseEnter={ () => handleSetButtonHover(true) }
                onMouseLeave={ () => handleSetButtonHover(false) }
                ref={ buttonRef }
            >
                {/* loading状态 */}
                {
                    prop.loading ? (
                        <div
                            className={ classnames(
                                style.loadingWrap,
                                style[`loading-${prop.size!}`],
                                {
                                    [style.link]: prop.type === 'link'
                                }
                            ) }
                            style={{'--icon-width': suffixPx(loadingWidth[prop.size!]),
                            '--icon-height': suffixPx(loadingHeight[prop.size!]) } as CSSProperties}
                        >
                            <ReoIcon
                                name={ 'icon-icon-loading-1' }
                                color={ prop.color ?? (prop.type === 'link' || prop.ghost) ? '#ccc' : '#FFFFFF' }
                                width={ loadingWidth[prop.size!] }
                            />
                        </div>
                    ) : null
                }
                {
                    <ChildrenNode
                        { ...prop }
                        buttonHover={ buttonHover }
                        className={
                            classnames({
                                [style.visibilityHidden]: ( prop.loading && prop.type !== 'link' ),
                                [style.hidden]: prop.loading && prop.type === 'link'
                            })
                        }
                    />
                }
            </button>
            {
                prop.lightShadow
                    ? (
                        <span className={ classnames(style.lightShadow) }></span>
                    )
                    : null
            }
        </>
    );
});

export default ReoButton;
export { IProps };
