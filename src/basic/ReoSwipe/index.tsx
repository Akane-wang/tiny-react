import React, { useMemo, useEffect } from 'react';
import { throttle, preventClick } from './util';
import { IProps } from './interface';

const ReoSwipe: React.FC<IProps> = (props) => {

    const clickOffset = React.useRef(5);

    const childrenWrap = React.useRef<HTMLDivElement>(null);
    const parent = React.useRef<HTMLDivElement>(null);

    const startX = React.useRef(0);
    const currentX = React.useRef(0);
    const lastX = React.useRef(0);
    const [dragging, setDragging] = React.useState(false);

    const onMouseMoveHandle = useMemo(() => throttle((e: MouseEvent | TouchEvent) => {

        const parentWidth = parent.current?.clientWidth ?? 0;
        const childWidth = childrenWrap.current?.scrollWidth ?? 0;
        const distance = (e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX) - startX.current;

        currentX.current += distance;

        // 修正边界
        if (currentX.current + (childWidth - parentWidth) < 0) {

            currentX.current = parentWidth - childWidth;
        }
        else if (currentX.current > 0) {

            currentX.current = 0;
        }

        if (
            currentX.current - lastX.current > clickOffset.current
            || currentX.current - lastX.current < -clickOffset.current
        ) {

            parent.current?.addEventListener('click', preventClick);
        }

        startX.current = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
        props.onChange?.(currentX.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 16), []);

    const onMouseUpHandle = useMemo(() => () => {

        setDragging(false);
        // 记住上一次拖拽结束时的位置
        lastX.current = currentX.current;

        setTimeout(() => {

            parent.current?.removeEventListener('click', preventClick);

        }, 0);

    }, []);

    const handleMouseDownHandle = React.useCallback((e) => {

        startX.current = e.pageX ?? e.changedTouches[0].pageX;
        setDragging(true);

    }, []);

    useEffect(() => {

        if (dragging) {

            document.getElementsByTagName('body')[0]
                .addEventListener('mousemove', onMouseMoveHandle);
            // 处理M端touch事件
            document.getElementsByTagName('body')[0]
                .addEventListener('touchmove', onMouseMoveHandle);
            document.getElementsByTagName('body')[0]
                .addEventListener('mouseup', onMouseUpHandle);
            // 处理M端touch事件
            document.getElementsByTagName('body')[0]
                .addEventListener('touchend', onMouseUpHandle);

        }
        else {

            document.getElementsByTagName('body')[0]
                .removeEventListener('mousemove', onMouseMoveHandle);
            // 处理M端touch事件
            document.getElementsByTagName('body')[0]
                .removeEventListener('touchmove', onMouseMoveHandle);
            document.getElementsByTagName('body')[0]
                .removeEventListener('mouseup', onMouseUpHandle);
            // 处理M端touch事件
            document.getElementsByTagName('body')[0]
                .removeEventListener('touchend', onMouseUpHandle);

        }
    }, [dragging, onMouseMoveHandle, onMouseUpHandle]);

    useEffect(() => {

        const parentWidth = parent.current?.clientWidth ?? 0;
        const childWidth = childrenWrap.current?.scrollWidth ?? 0;

        currentX.current = props.left;

        // 修正边界
        if (currentX.current + (childWidth - parentWidth) < 0) {

            currentX.current = parentWidth - childWidth;
        }
        else if (currentX.current > 0) {

            currentX.current = 0;
        }

        if( childrenWrap.current ) {
            childrenWrap.current.style.transform = `translateX(${ props.left }px)`;
        }

    }, [props.left]);

    return (
        <div
            ref={ parent }
            style={{
                width: '100%',
                overflow: 'hidden',
                userSelect: 'none',
                cursor: dragging ? 'grabbing' : 'grab'
            }}
        >
            <div
                onMouseDown={ handleMouseDownHandle }
                onTouchStart={ handleMouseDownHandle }
                ref={ childrenWrap }
                style={{ width: 'max-content' }}
            >
                { props.children }
            </div>
        </div>
    );
};

export default ReoSwipe;

// TODO：后续优化橡皮筋样式
