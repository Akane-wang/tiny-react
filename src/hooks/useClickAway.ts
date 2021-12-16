import { RefObject, useCallback, useEffect } from 'react';

// 鼠标点击事件，click 不会监听右键
const defaultEvent = 'click';

type EventType = MouseEvent | TouchEvent;

export default function useClickAway(
    onClickAway: (event: EventType) => void,
    target: Array<RefObject<HTMLElement>> | RefObject<HTMLElement>,
    eventName: string = defaultEvent
): void {

    const handler = useCallback((event: any): void => {

        const targets = Array.isArray(target) ? target : [target];
        const isClickInner = targets.some((targetItem) => {
            const targetElement = targetItem.current as HTMLElement;
            return !targetElement || targetElement?.contains(event.target);
        });
        if ( isClickInner ) {
            return;
        }

        onClickAway(event);

    }, [target, onClickAway]);

    useEffect(() => {

        document.addEventListener(eventName, handler, true);

        return () => {
            document.removeEventListener(eventName, handler, true);
        };
    }, [target, eventName, handler]);
}
