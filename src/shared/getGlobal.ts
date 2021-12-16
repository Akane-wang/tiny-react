export function getGlobal(): Window & typeof globalThis {

    let temp;

    if (typeof self !== 'undefined') {

        temp = self;
    }
    if (typeof window !== 'undefined') {

        temp = window;
    }
    if (typeof global !== 'undefined') {

        temp = global;
    }
    if (typeof globalThis !== 'undefined') {

        temp = globalThis;
    }

    if (temp) {

        return temp as Window & typeof globalThis;
    }

    throw new Error('unable to locate global object');
}
