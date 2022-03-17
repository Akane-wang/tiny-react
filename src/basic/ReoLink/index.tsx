import React, { useCallback, useMemo, forwardRef, useRef, useImperativeHandle } from 'react';
import style from './link.module.less';
import { ReoIcon } from '@/index';
import classnames from 'classnames';
import { IProps, Target } from './interface';
import { suffixPx } from '@/dom-utils';

const defaultProps = {
    iconWidth: 10,
    fontSize: 16,
    color: '#00ADE5',
    target: '_self',
    hoverUnderline: true,
    underline: false
};

const ReoLink = forwardRef((props: IProps, ref) => {

    const reolinkRef = useRef<HTMLAnchorElement>(null);
    const p = useMemo(() => {

        return {...defaultProps, ...props};

    }, [props]);
    const cssStyle = useMemo(() => {

        return {
            '--link-font': suffixPx(p.fontSize),
            '--link-color': p.color,
            '--link-hover-color': p.hoverColor ?? p.color,
        } as React.CSSProperties;

    }, [p.color, p.fontSize, p.hoverColor]);

    const linkBottomStyle = useMemo(() => {

        return {
            '--link-border-bottom-color': (p.underline || p.hoverUnderline) ? p.color : 'transparent'
        } as React.CSSProperties;

    }, [p.color, p.hoverUnderline, p.underline]);

    const isIconExist = useMemo(() => {

        return !!p.icon;

    }, [p.icon]);
    const isNormalLink = useMemo(() => {

        return isIconExist || (!p.transition);

    }, [isIconExist, p.transition]);

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.stopPropagation();
            p.onClick?.();
        },
        [p],
    );

    useImperativeHandle(ref, () => {
        return reolinkRef.current;
    });

    return (
        <a
            className={ classnames( style.linkClass, p.className ) }
            href={ p.href }
            style={ cssStyle }
            onClick={ (e) => handleClick(e) }
            target={ p.target }
            title={ p.title }
            ref={ reolinkRef }
        >
            <span
                className={ classnames(
                    style.link_span,
                    style[isNormalLink ? 'link' : 'link-right-arrow'],
                    p.classInnerName,
                    {
                        [classnames(style.hasIcon)]: isIconExist && isNormalLink,
                        [style.noUnderline]: !(p.underline && p.hoverUnderline),
                        [style.underline]: p.underline,
                        [classnames(style.transition, 'transition')]: p.transition
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

});

export {
    IProps,
    Target
};
export default ReoLink;
