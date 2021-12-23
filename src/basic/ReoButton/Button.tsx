import React, { CSSProperties, useCallback, useMemo, useState } from 'react';
import style from './button.module.less';
import ReoIcon from '../ReoIcon';
import classnames from 'classnames';
import {iconWidth, iconSizeSpace, loadingWidth, loadingHeight } from './style';
import { IProps, IChildrenNode } from './interface';
import { suffixPx } from '@/dom-utils';
import { getGlobal } from '@/shared';

const defaultProps: IProps = {
    type: 'primary',
    size: 'large',
    loading: false,
    disabled: false,
    ghost: false,
    toggleGhost: false,
    hoverFloat: false,
    borderRadius: 'rounded',
    iconPosition: 'right',
    width: '',
    className: '',
    lightShadow: false
};

const ChildrenNode: React.FC<IProps & IChildrenNode> = (p) => {

    const iconSpace = useMemo(() => {
        return {
            '--icon-space': p.icon?.length ? iconSizeSpace[p.size!] : '0rem'
        } as CSSProperties;
    }, [p.icon?.length, p.size]);

    let iconColor = '#fff';
    if ( p.disabled ) { // 被禁用
        iconColor = p.ghost ? '#ccc' : '#fff';
    }
    else if (p.buttonHover && p.toggleGhost) {
        const tempIconColor = p.iconHoverColor ?? p.iconColor ?? p.color;
        switch(p.type) {
            case 'primary': iconColor = tempIconColor ?? (p.ghost ? '#00ade5' : '#fff'); break;
            case 'gradientRedPrimary': iconColor = tempIconColor ?? (p.ghost ? '#EB3349' : '#fff'); break;
            case 'linkButton': iconColor = tempIconColor ?? '#00ade5'; break;
            case 'unset':
            default: iconColor = tempIconColor ?? '#fff';
        }
    }
    else {
        iconColor = p.iconColor ?? p.color ?? (p.ghost ? (p.type === 'primary' ? '#00ade5' : '#EB3349') : '#fff');
    }
    return (
        <div className={
            classnames(
                style.buttonChild,
                style.buttonBaseline,
                style.textWrap,
                { [classnames(style.childrenPosition)]: p.iconPosition === 'right' },
                p.className
        )
        }
        >
            {
                p.icon ? (
                    <ReoIcon
                        name={ p.icon }
                        width={ suffixPx(p.iconWidth ?? iconWidth[p.iconPosition!][p.size!]) }
                        height={ suffixPx(p.iconHeight ?? p.iconWidth ?? iconWidth[p.iconPosition!][p.size!]) }
                        color={ iconColor }
                    />
) : null
            }
            <span
                className={ classnames(style[`icon-${p.iconPosition}`], style.textShow) }
                style={ iconSpace }
            >{ p.children }
            </span>
        </div>
    );
};

const ReoButton: React.FC<IProps>= (props) => {

    const prop = useMemo(() => {
        return {...defaultProps, ...props};
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
    const [buttonHover, setButtonHovered] = useState(false);

    const handleSetButtonHover = useCallback((buttonHover: boolean): void => {
        // * 1280以上才会有hover效果，以下则表示iPad与移动端，无hover效果
        if(getGlobal().innerWidth > 1280) {
            setButtonHovered(buttonHover);
        }
    }, []);

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
                            classnames(style[`buttonStyle-${props.type!}`],
                            style[props.type!])
                        ]: ['primary', 'gradientRedPrimary', 'linkButton'].includes(prop.type!)
                    },
                    style[`size-${prop.size!}`],
                    {
                        [classnames(style.hoverFloat)]: prop.hoverFloat,
                        [classnames(style.toggleGhost)]: prop.toggleGhost,
                        [classnames(style.ghost)]: prop.ghost,
                        [classnames(style.loading)]: prop.loading
                    },
                    style[`border-${prop.borderRadius ?? 'rounded'}`],
                    style[`size-${prop.size}`],
                    prop.className
                ) }
                style={{ ...cssStyle, ...prop.style }}
                onMouseEnter={ () => handleSetButtonHover(true) }
                onMouseLeave={ () => handleSetButtonHover(false) }
            >
                {/* loading状态 */}
                {
                    prop.loading ? (
                        <div
                            className={ classnames(
                                style.loadingWrap,
                                style[`loading-${prop.size!}`],
                                {
                                    [style.linkButton]: prop.type === 'linkButton'
                                }
                            ) }
                            style={{'--icon-width': suffixPx(loadingWidth[prop.size!]),
                            '--icon-height': suffixPx(loadingHeight[prop.size!]) } as CSSProperties}
                        >
                            <ReoIcon
                                name={ 'icon-icon-loading-1' }
                                color={ prop.color ?? (prop.type === 'linkButton' || prop.ghost) ? '#ccc' : '#FFFFFF' }
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
                                [style.visibilityHidden]: (prop.loading && prop.type !== 'linkButton'),
                                [style.hidden]: prop.loading && prop.type === 'linkButton'
                            })
                        }
                    />
                }
            </button>
            {
                prop.lightShadow ? <span className={ classnames(style.lightShadow) }></span> : null
            }
        </>
    );
};

export default ReoButton;
export { IProps };
