import React, { CSSProperties, useRef, useImperativeHandle, forwardRef, useMemo, useCallback } from 'react';
import style from './icon.module.less';
import classnames from 'classnames';
import { suffixPx } from '@/dom-utils';
import { IProps, IPath, PreIconIconProps } from './interface';

const defaultProp = {
    width: 30,
    color: '#555'
};

const PathArr = forwardRef((p: IPath, ref) => {
    const spanRef = useRef<HTMLSpanElement>(null);
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
                classnames(style.iconWrap, p.className, style['icon-display'], p.name)
            }
            onClick={ handleClick }
            style={{ ...hoverStyle, ...fontSize, ...p.style }}
            onMouseEnter={ handleMouseEnter }
            onMouseLeave={ handleMouseMove }
        >
        </span>
    );
});

const ReoIcon = forwardRef( (props: IProps, ref) => {

    const prop = { ...defaultProp, ...props };

    return (
        <PathArr
            { ...prop }
            ref={ ref }
        />
    );

});

export { IProps, PreIconIconProps };
export default ReoIcon;
