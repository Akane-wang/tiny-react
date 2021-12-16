import React, { CSSProperties, useRef, useImperativeHandle, forwardRef, useMemo, useCallback } from 'react';
import { EIconType } from '@/public/interface';
import style from './icon.module.less';
import classnames from 'classnames';
import { suffixPx } from '@/dom-utils';
import { IProps, IPath } from './interface';

const defaultProp = {
    width: '30px',
    color: '#555'
};

const PathArr = forwardRef((p: IPath, ref) => {

    const hoverStyle = useMemo(() => {
        return {
            '--svg-fill': p.color,
            '--svg-hover-fill': p.hoverColor ?? p.color
        } as CSSProperties;
    }, [p.color, p.hoverColor]);

    const fontSize = useMemo(() => {
        return {
            '--font-size': suffixPx(p.width ?? p.height)
        };
    }, [p.height, p.width]);

    const spanRef = useRef<HTMLSpanElement>(null);

    useImperativeHandle(ref, () => {
        return spanRef.current;
    });

    const handleClick = useCallback((e) => {
        p.onClick?.(e);
    }, [p]);

    const handleMouseEnter = useCallback((e) => {
        p.onMouseEnter?.(e);
    }, [p]);

    const handleMouseMove = useCallback((e) => {
        p.onMouseLeave?.(e);
    }, [p]);

    return (
        <span
            ref={ spanRef }
            className={
                classnames(style.iconWrap, p.className, style['icon-display'], p.iconName)
            }
            onClick={ handleClick }
            style={{...hoverStyle, ...fontSize, ...p.style}}
            onMouseEnter={ handleMouseEnter }
            onMouseLeave={ handleMouseMove }
        >
        </span>
    );
});

const ReoIcon = forwardRef( (props: IProps, ref) => {

    const prop = {...defaultProp, ...props};

    return (
        <PathArr
            iconName={ props.name }
            { ...prop }
            ref={ ref }
        />
    );

});

export { EIconType, IProps };
export default ReoIcon;
