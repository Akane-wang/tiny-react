// 数值添加单位（以px结尾，不处理，否则为其添加px）
export const suffixPx = (pxVal: number | string): string => {
    const regExp =/(px)$/ig;
    const res = regExp.test(pxVal.toString())
        ? pxVal.toString()
        : `${parseFloat(pxVal.toString())}px`;
    return res;

};
