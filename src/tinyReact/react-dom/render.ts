import { DELETION, PLACEMENT, TEXT, UPDATE } from '../const';
import { Container } from '@/tinyReact/@types/react-dom/render';
import { Fiber } from '../@types/react/createElement';

// TODO:1.fiber的结构是什么
let nextUnitOfWork: any = null; // 下一单元任务
let workInProgressRoot: any = null; // 当前root节点
let workInProgress: Fiber | null = null; // 当前正在构造的fiber节点(fiber树指针)
let currentRoot: any = null; // 现在的根节点（DOM树指针）
let deletions: any = null;

/**
*   fiber树有两棵，分别是
* 正在构造的fiber树（workInProgress）
* 当前页面的fiber树（已经渲染，被挂载到fiberRoot.current上）
*/
/**
 * fiber结构
 *
 * type: 标记fiber的类型，是reactElement对象的type, 与其他的key如elementType, tag是同一个值
 * key: 标记当前层级下的唯一性，与reactElement的key一致
 * props：fiber属性
 * base: 上一次更新的fiber节点
 * child: 第一个子元素
 * sibling 下一个兄弟节点
 * return 父节点
 * stateNode: 与fiber关联的局部状态节点（如：HostComponent类型指向与fiber节点对应的DOM节点；根节点fiber.stateNode指向FiberRoot; class类型节点的stateNode指向class实例）
 *
  */

//   workInProgressFiber: 正在工作中的fiber
function reconcilerChildren(workInProgressFiber: Fiber, children: any): void {
    // 构建fiber结构
    // 更新，删除，新增
    let prevSibling: any = null;
    let oldFiber = workInProgressFiber.base && workInProgressFiber.base.child;
    children.forEach((child: any, index: number) => {
        let newFiber = null;
        const sameType = child && oldFiber && child.type === oldFiber.type;
        if(sameType) {
            // 类型相同，可复用
            newFiber = {
                type: oldFiber?.type,
                props: child.props,
                stateNode: oldFiber?.stateNode, // 真实节点
                base: oldFiber, // 上一次更新的fiber节点
                child: null,
                sibling: null,
                return: workInProgressFiber, // 父节点
                flags: 'UPDATE' as const
            }
        }

        if(!sameType && child) {
            // 类型不同， child 存在，新增插入
            newFiber = {
                type: child.type,
                props: child.props,
                stateNode: null,
                base: null,
                return: workInProgressFiber,
                flags: 'PLACEMENT' as const,
                child: null,
                sibling: null
            }
        }

        if(!sameType && oldFiber) {
            // 删除
            oldFiber.flags = 'DELETION' as const;
            deletions.push(oldFiber);
        }

        if(oldFiber) {
            oldFiber = oldFiber.sibling;
        }

        // 形成链表结构
        if(index === 0) {
            workInProgressFiber.child = newFiber;
        }
        else {
            prevSibling.sibling = newFiber;
        }

        prevSibling = newFiber;

    })
}

function setValueForStyles(node: any, styles: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) {
    for(const styleName in styles) {
        if(!styles.hasOwnProperty(styleName)) {
            continue;
        }
        // --自定义style
        const isCustomProperty = /^--/.test(styleName);
        if(isCustomProperty) {
            node.style.setProperty(styleName, styles[styleName]);
        }
        // 普通style
        else {
            node.style[styleName] = styles[styleName];
        }
    }
}

function updateNode(node: Container, preVal: any, nextVal: any) {
    Object.keys(preVal)
        .filter(item => item !== 'children')
        .forEach(key => {
            if(/on/.test(key)) {
                let eventName = key.slice(2).toLowerCase();
                node.removeEventListener(eventName, preVal[key]);
            }
            else {
                if(!(key in nextVal)) {
                    (node as any)[key] = "";
                }
            }
        });

        Object.keys(nextVal)
        .filter(k => k !== "children")
        .forEach(k => {
            if(k.slice(0, 2) === 'on') {
                let eventName = k.slice(2).toLowerCase();
                node.addEventListener(eventName, nextVal[k]);
            }
            else if (k === 'style') {
                setValueForStyles(node, preVal[k]);
            }
            else {
                (node as any)[k] = nextVal[k];
            }
        })
}

function updateClassComponent(fiber: any): Container {
    const { type, props } = fiber;

    const vvnode = new type(props).render();
    const node = createNode(vvnode);
    console.log(node);
    return node;
}

function updateFunctionComponent(fiber: any): void {
    const  { type, props } = fiber;
    // console.log(type);

    let children = [type(props)];
    reconcilerChildren(fiber, children);
    // const vvnode = type(props);
    // const node = createNode(vvnode, parentNode);
    // return node;

}

// 普通标签节点更新
function updateHostComponent(fiber: Fiber): void {
    // 啥时候会执行至此
    if(!fiber.stateNode) {
        fiber.stateNode = createNode(fiber);
    }

    const { children } = fiber.props;

    reconcilerChildren(fiber, children);

}

function createNode(fiber: Fiber): Container {

    let node = null;
    const { type, props } = fiber;
    /* 文本节点 */
    if(type === TEXT) {
        node = document.createTextNode("") // (fiber.props.nodeValue);
    }
    /* html标签节点 */
    else if(typeof type === 'string') {
        node = document.createElement(type);
    }

    else if(typeof type === 'function') {
        node = type.isReactComponent
            ? updateClassComponent(fiber) /* class组件 */
            : updateFunctionComponent(fiber) /* function 组件 */
    }

    // /* 其他如portals组件 */
    // /* fragment */
    else {
        node = document.createDocumentFragment();
    }

    // reconcilerChildren(props.children, node); // 递归执行render
    updateNode(node as any, {}, props);
    return node as any;
}

// 1. 执行render, 通过reactDom执行挂载；实现目的，将nextUnitOfWork赋值
function render(
    element: any,
    container: Container | null,
    // callback?: () => void
): void {

    // return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
    // 创建fiberRoot
    // 首次没有type, 首次源码中是执行updateHostRot();暂时不明白有什么实质操作，所以暂且没有被处理
    workInProgress = {
        stateNode: container, // 真实dom节点
        props: {
            children: [element]
        },
        base: currentRoot // 上次更新的dom节点(现在的根节点)初始时为null
    };
    deletions = [];
}

function completeWork(fiber: Fiber) {
    if(typeof fiber.type === 'function') {
        return null;
    }
    else {
        return null;
    }
}

function completeUnitOfWork(fiber: Fiber) {
    let completedWork: Fiber | null = fiber;
    do {

        let next = completeWork(completedWork);
        if(next !== null) {
            workInProgress = next;
            return;
        }

        const siblingFiber = completedWork.sibling;
        if(siblingFiber) {
            workInProgress = siblingFiber;
            return;
        }
        completedWork = completedWork.return ?? null;
        workInProgress = completedWork;
    } while (completedWork != null)
}

/**
 * 深度优先遍历阶段（两个阶段共同完成每一个fiber的创建）
 * beginWork 探寻阶段
 * completeWork 回溯阶段
 * 返回下一个fiber节点
 */
function performUnitOfWork(fiber: Fiber) {

    // 1. 探寻(通过requestIdleCallback发起探寻)
    let nextFiber = beginWork(fiber);

    if(nextFiber) {
        workInProgress = nextFiber;
    }
    else {
        /**
         * 2.回溯
         * 2.1 处理fiber节点，会调用渲染器（调用react-dom包，关联fiber节点和dom对象，绑定事件等）
         *
         */
        completeUnitOfWork(fiber);
    }

    // if(fiber.child) {
    //     return fiber.child;
    // }
    // let nextFiber = fiber;
    // while(nextFiber) {
    //     if(nextFiber.sibling) {
    //         return nextFiber.sibling;
    //     }
    //     nextFiber = nextFiber.return;
    // }

}

/**
 * 探寻阶段
 * 1. 根据reactElement对象创建fiber节点；构造fiber树形结构
 * 2. 设置fiber.flag标记增删改查等，等待completeWork阶段处理
 * 3. 设置fiber.stateNode 局部状态（如class类型节点fiber.stateNode = new Class())
 */
function beginWork(workInProgress: Fiber) {
    const { type } = workInProgress;
    if(typeof type === 'function') {
        type.isReactComponent
            ? updateClassComponent(workInProgress)
            : updateFunctionComponent(workInProgress);
    }
    else {
        updateHostComponent(workInProgress);
    }

    if(workInProgress.child) {
        return workInProgress.child;
    }
    return null;
    // else if(workInProgress.sibling) {
    //     return workInProgress.sibling;
    // }
    // else {
    //     return workInProgress.return;
    // }
}

interface IDeadLine {
    didTimeout: boolean;
    timeRemaining(): number;
}

// 渲染节点
function commitRoot() {
    deletions.forEach(commitWorker);
    commitWorker(workInProgressRoot?.child);
    currentRoot = workInProgressRoot;
    workInProgressRoot = null;
}

function commitDeletions(fiber: Fiber | null, parentNode: any) {
    if(fiber?.stateNode) {
        parentNode.removeChild(fiber.stateNode);
    }
    else {
        commitDeletions(fiber?.child ?? null, parentNode);
    }
}

function commitWorker(fiber: Fiber | null) {
    if(!fiber) {
        return;
    }

    let parentNodeFiber = fiber.return;
    while(!parentNodeFiber.stateNode) {
        parentNodeFiber = parentNodeFiber.return;
    };
    const parentNode = parentNodeFiber.stateNode;

    if(fiber.stateNode !== null) {
        if(fiber.flags === PLACEMENT) {
            parentNode.appendChild(fiber.stateNode);
        }
        else if(fiber.flags === UPDATE) {
            updateNode(fiber.stateNode, fiber.base?.props, fiber.props);
        }
        else if (fiber.flags === DELETION) { // 需要删除子节点
            commitDeletions(fiber, parentNode);
        }
    }

    commitWorker(fiber.child ?? null);
    commitWorker(fiber.sibling ?? null);
}

/**
 * 循环构造
 * @param deadline: 可以通过timeRemaining实现时间切片和可中断渲染；属于concurrent机制
 */
function workLoop (deadline: IDeadLine) {

    // 如果workInProgress和时间:deadline的剩余时间还够
    while(workInProgress && deadline.timeRemaining() > 1) {
        workInProgress = performUnitOfWork(workInProgress);
    }

    if(!workInProgress && workInProgressRoot) {
        commitRoot();
    }

    requestIdleCallback(workLoop);
}

// 2.通过requestIdleCallback方法，即浏览器的自带方法在浏览器空闲时间执行回调，workLoop
requestIdleCallback(workLoop);

let wipFiber: any = null;
let hookIndex: any = null;
export function useState(init: any): any {
    const oldHook = wipFiber?.base && wipFiber?.base.hooks[hookIndex];
    const hook = { state: oldHook ? oldHook.state : init, queue: [] };
    const actions = oldHook ? oldHook.queue : [];
    actions.forEach((action: any) => (hook.state = action));
    const setState = (action: any) => {
        (hook.queue as any[]).push(action);
        workInProgressRoot = {
            stateNode: currentRoot.stateNode,
            props: currentRoot.props,
            base: currentRoot
        }

        nextUnitOfWork = workInProgressRoot;
        deletions = [];
    }
    wipFiber?.hooks.push(hook);
    hookIndex++;
    return [hook.state, setState];
}

export default render;
