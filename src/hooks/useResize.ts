import { useCallback, useEffect, useRef, useState} from 'react';
import { getGlobalProperty } from '@/shared';

interface IWindowSize {
    widthOfWindow: number;
    heightOfWindow: number;
}

const useResize = (): IWindowSize => {

    const [
        widthOfWindow,
        setWidthOfWindow
    ] = useState<number>(getGlobalProperty('innerWidth', 0));
    const [
        heightOfWindow,
        setheightOfWindow
    ] = useState<number>(getGlobalProperty('innerHeight', 0));

    const timer = useRef(0);

    const handleDebounceResizeFn = useCallback((): void => {
        clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setWidthOfWindow(width);
            setheightOfWindow(height);
        }, 300);
    }, []);

    useEffect(() => {

        handleDebounceResizeFn();
        window.addEventListener('resize', handleDebounceResizeFn);

        return () => {
            window.removeEventListener('resize', handleDebounceResizeFn);
        };
    }, [ handleDebounceResizeFn ]);

    return {widthOfWindow: widthOfWindow, heightOfWindow: heightOfWindow};
};

export default useResize;
