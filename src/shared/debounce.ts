type Fun = (...args: any[]) => any;

export default (fn: Fun, delay: number): Fun => {

    let timer: number;

    return (...args: any[]) => {

        if(timer) {

            window.clearTimeout(timer);
        }

        timer = window.setTimeout(()=> {

            fn.apply(this, args);
            timer = 0;

        }, delay);

    };
};
