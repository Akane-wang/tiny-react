/**
 * 节流
 * @param func 待执行函数
 * @param wait 执行函数的间隔阈值，单位毫秒
 */
export function throttle(func: (e: MouseEvent) => void, wait: number): (e: MouseEvent) => any {

    let lastTime = 0;
    let timer: NodeJS.Timeout;

    return (e) => {

        if(timer) {

            clearTimeout(timer);

        }
        const currentTime = Date.now();
        if(!lastTime || currentTime >= lastTime + wait) {

            lastTime = currentTime;
            func(e);

        }
        else {

            timer = setTimeout(() => {

                lastTime = currentTime;
                func(e);

            }, wait);

        }
    };

}

export function preventClick(e: MouseEvent): void {

    e.preventDefault();
    e.stopImmediatePropagation();

}
