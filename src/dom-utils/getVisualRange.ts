interface IVisualRange {
    top: number;
    bottom: number;
    width: number;
    left: number;
    right: number;
    height: number;
}

/**
 * 获取目标节点的可视范围在scroll中的位置及宽度
 * @param target 目标节点
 */
type TargetRef = HTMLDivElement | Window | null;
export function getVisualRange(
    target: TargetRef = window,
    ancestor: TargetRef = window
): IVisualRange {
    const range = {
        left: 0,
        right: 0,
        width: 0,
        top: 0,
        bottom: 0,
        height: 0,
    };

    // 复制副本
    const ancestorRange = Object.assign({}, range);

    // 复制结果
    const resultRange = Object.assign({}, range);

    // 两个都不在时
    if(!(target && ancestor)) {
        return range;
    }

    if(target instanceof Window) {
        Object.assign(range, {
            top: window.pageYOffset,
            bottom: window.pageYOffset + window.innerHeight,
            width: window.innerWidth,
            height: window.innerHeight,
            left: window.pageXOffset,
            right: window.pageXOffset + window.innerWidth,
        });

        return range;
    }
    else {
        const targetBoundingRect = target.getBoundingClientRect();
        range.left = targetBoundingRect.left + window.pageXOffset;
        range.right = targetBoundingRect.right + window.pageXOffset;
        range.width = targetBoundingRect.width;
        range.height = targetBoundingRect.height;
        range.bottom = targetBoundingRect.bottom + window.pageYOffset;
        range.top = targetBoundingRect.top + window.pageYOffset;
    }

    if(ancestor instanceof Window) {
        Object.assign(ancestorRange, {
            top: window.pageYOffset,
            bottom: window.pageYOffset + window.innerHeight,
            width: window.innerWidth,
            height: window.innerHeight,
            left: window.pageXOffset,
            right: window.pageXOffset + window.innerWidth,
        });
    }
    else {
        const ancestorBoundingRect = ancestor.getBoundingClientRect();
        ancestorRange.left = ancestorBoundingRect.left + window.pageXOffset;
        ancestorRange.right = ancestorBoundingRect.right + window.pageXOffset;
        ancestorRange.width = ancestorBoundingRect.width;
        ancestorRange.height = ancestorBoundingRect.height;
        ancestorRange.bottom = ancestorBoundingRect.bottom + window.pageYOffset;
        ancestorRange.top = ancestorBoundingRect.top + window.pageYOffset;
    }

    resultRange.left = ancestorRange.left > range.left
        ? ancestorRange.left - range.left
        : ancestorRange.left;
    resultRange.width = ancestorRange.width;
    resultRange.right = resultRange.left + ancestorRange.width;
    resultRange.height = ancestorRange.height;
    resultRange.top = ancestorRange.top > range.top
        ? ancestorRange.top - range.top
        : ancestorRange.top;
    resultRange.bottom = ancestorRange.top + ancestorRange.height;

    return resultRange;
}
