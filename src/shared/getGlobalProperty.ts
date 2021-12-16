import { getGlobal } from '.';

export function getGlobalProperty<
    T extends typeof window,
    TK extends keyof typeof window
>(property: TK, defaultValue: T[TK]): T[TK] {

    const global = getGlobal();
    return (global as any)[property] ?? defaultValue;
}
