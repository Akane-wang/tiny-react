// 获取目标节点的祖先节点，存入数组，并返回
export const getTargetAncestors = (
    target: HTMLElement | Window,
    ancestor: Element | HTMLElement | Document = document
): Array<HTMLElement | Document | Window | Element> => {
    const ancestorArr = [];
    if(target instanceof HTMLElement) {
        let parentTemp = target.parentElement;
        while(parentTemp && ancestor.contains(parentTemp)) {
            ancestorArr.push(parentTemp);
            parentTemp = parentTemp.parentElement;
        }
    }

    ancestorArr.push(window);

    return ancestorArr;
};
