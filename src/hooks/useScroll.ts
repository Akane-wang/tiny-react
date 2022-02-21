import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getTargetAncestors } from '@/dom-utils';
import { debounce } from '@reolink/web.fe.utils';
interface IPosition {
    left: number;
    top: number;
}

type ITarget = HTMLElement | Window;
type IAncestor = HTMLElement | Document | Window | Element;
type IAncestorsList = IAncestor[];

function useScroll(targetRef: React.RefObject<HTMLDivElement> | Window = window): IPosition {
    // 获取target,监听滚动时的定位，返回

    const [position, setPosition] = useState<IPosition>({left: 0, top: 0});

    function isWindowInstance(target: unknown): target is Window {

        return target instanceof Window;
    }

    // scroll回调，更新position(position变化即表示被滚动)
    const handleScroll = useCallback(() => {
        if(!(isWindowInstance(targetRef) || targetRef.current)) return;
        if(isWindowInstance(targetRef)) {
            setPosition({top: window.pageYOffset, left: window.pageXOffset});
        }
        else {
            const top = targetRef.current!.getBoundingClientRect().top;
            const left = targetRef.current!.getBoundingClientRect().left;
            setPosition({top: top, left: left});

        }
    }, [targetRef]);

    const debounceFunc = useMemo(() => {
        return debounce(handleScroll, 50);
    }, [handleScroll]);

    const eventListener = useCallback((
        elementArr: IAncestorsList,
        target: ITarget,
        cb: (ele: IAncestor) => void
    ) => {

        for(const elem of Array.from(elementArr)) {

            if(
                (
                    (elem instanceof HTMLElement || elem instanceof Document)
                    &&
                    ( target instanceof HTMLElement ) && elem.contains(target)
                ) || elem instanceof Window || target instanceof Window
            ) {
                cb(elem);
            }
        }
    }, []);

    // 寻找滚动的节点，将目标节点的祖先节点绑定scroll回调函数
    const addScrollListener = useCallback((elementArr: IAncestorsList, target: ITarget) => {
        eventListener(
            elementArr,
            target,
            (elem) => {
                elem.addEventListener('scroll', debounceFunc, false);
            }
        );

        return () => {
            eventListener(
                elementArr,
                target,
                (elem) => {
                    elem.removeEventListener('scroll', debounceFunc, false);
                }
            );
        };

    }, [debounceFunc, eventListener]);

    useEffect(() => {

        // targetRef 既不是window，又没有被绑定，则返回
        if (!(isWindowInstance(targetRef) || targetRef.current)) return;

        // 寻找targetRef的祖先节点
        const target = (isWindowInstance(targetRef)) ? targetRef : targetRef.current!;
        const ancestorsArr = getTargetAncestors(target);

        //为targetRef的祖先节点绑定scroll回调
        addScrollListener(ancestorsArr, target);
    }, [addScrollListener, targetRef]);

    return position;
}

export default useScroll;
