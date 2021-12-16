import React, { useCallback, useMemo } from 'react';
import style from './link.module.less';
import ReoIcon from '../ReoIcon';
import classnames from 'classnames';
import { IProps } from './interface';

const defaultProps = {
    iconWidth: 10,
    fontSize: '16px',
    color: '#00ADE5',
    target: '_self',
    underline: true,
};

const ReoLink = (props: IProps): React.ReactElement => {

    const p = useMemo(() => {
        return {...defaultProps, ...{ transition: !!props.icon }, ...props};
    }, [props]);
    const isIconExist = !!p.icon;
    const isNormalLink = isIconExist || (!p.transition);

    const cssStyle = useMemo(() => {
        return {
            '--link-font': p.fontSize,
            '--link-color': p.color,
            '--link-hover-color': p.hoverColor ?? p.color,
        } as React.CSSProperties;
    }, [p.color, p.fontSize, p.hoverColor]);
    const linkBottomStyle = useMemo(() => {
        return {
            '--link-border-bottom-color': p.underline ? p.color : 'transparent'
        } as React.CSSProperties;
    }, [p.color, p.underline]);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.stopPropagation();
            p.onClick?.();
        },
        [p],
    );
    return (
        <a
            className={ classnames( style.linkClass, p.className ) }
            href={ p.href }
            style={ cssStyle }
            onClick={ (e) => handleClick(e) }
            target={ p.target }
            title={ p.title }
        >
            <span
                className={ classnames(
                    style[isNormalLink ? 'link' : 'link-right-arrow'],
                    p.classInnerName,
                    {
                        [classnames(style.hasIcon)]: isIconExist && isNormalLink,
                        [style.noUnderline]: !p.underline
                    }
                ) }
                style={ linkBottomStyle }
            >
                { p.children }
            </span>
            {
                (isIconExist || (!isNormalLink))
                ? (
                    <ReoIcon
                        name={
                            isIconExist
                            ? p.icon!
                            : 'icon-icon_arrow-right'
                        }
                        width={ p.iconWidth }
                        color={ p.color }
                    />
                )
                : null

            }
        </a>
    );

};

export {
    IProps
};
export default ReoLink;
