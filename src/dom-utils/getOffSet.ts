export interface IElementOffset {
    left: number;
    right: number; // curEle的左边加上本身宽度
    top: number;
    bottom: number; // 不考虑scroll，相对于window
    scrollBottom: number; // 加上scroll距离,相当于绝对bottom
    scrollLeft: number; // 加上scroll距离
    scrollRight: number;
    width: number;
    height: number;
}

export const getOffSet = (
    curEle: HTMLElement | null,
    getCurEleHeight: boolean = false,
    scrollContainer: Element | HTMLDivElement | Window | null = window
): IElementOffset | null => {
    if (!curEle) {
        return null;
    }
    const html = document.getElementsByTagName('html')[0];
    const offset = {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        scrollBottom: 0,
        scrollLeft: 0,
        scrollRight: 0,
        width: 0,
        height: 0
    };

    let yOffset = 0;
    let xOffset = 0;
    // 加上curEle自身的高度
    if (getCurEleHeight) {
        offset.top += curEle.offsetHeight;
    }

    // scrollContainer 存在且不为null 与 window
    if(!(scrollContainer instanceof Window || typeof scrollContainer === null)) {
        yOffset = scrollContainer!.getBoundingClientRect().top + window.pageYOffset;

        xOffset = scrollContainer!.getBoundingClientRect().left + window.pageXOffset;

    }

    const curEleBCR = curEle.getBoundingClientRect();
    const htmlBCR = html.getBoundingClientRect();

    offset.scrollBottom = htmlBCR.bottom + yOffset - (curEleBCR.bottom + yOffset);
    offset.scrollLeft = curEleBCR.left + window.pageXOffset - xOffset;
    offset.scrollRight = curEleBCR.left + window.pageXOffset - xOffset + curEleBCR.width;
    offset.bottom = window.innerHeight - curEleBCR.bottom;

    offset.top += curEleBCR.top + window.pageYOffset;
    offset.left += curEleBCR.left + window.pageXOffset;
    offset.right +=curEleBCR.right + window.pageXOffset;
    offset.width = curEleBCR.width;
    offset.height = curEleBCR.height;

    return offset;
};
