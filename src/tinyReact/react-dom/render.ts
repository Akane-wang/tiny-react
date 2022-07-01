import { DELETION, PLACEMENT, TEXT, UPDATE } from '../const';
import { Container } from '@/tinyReact/@types/react-dom/render';
import { Fiber } from '../@types/react/createElement';

let nextUnitOfWork: any = null; // 下一单元任务
let workInProgressRoot: any = null; // work in progress fiber root FiberRoot | null
let workInProgress: Fiber | null = null; // 正在处理的fiber节点
let currentRoot: any = null; // 现在的根节点
let deletions: any = null;

/**
 * fiber结构
 *
 * type: 标记fiber的类型
 * key: 标记当前层级下的唯一性
 * props：fiber属性
 * base: 上一次更新的fiber节点
 * child: 第一个子元素
 * sibling 下一个兄弟节点
 * return 父节点
 * stateNode: 真实dom节点
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
    console.log(fiber);

    const vvnode = new type(props).render();
    const node = createNode(vvnode);
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
    vnode: any,
    container: Container | null,
    // callback?: () => void
): void {

    workInProgressRoot = {
        stateNode: container, // 真实dom节点
        props: {
            children: [vnode]
        },
        base: currentRoot // 上次更新的dom节点(现在的根节点)
    };

    nextUnitOfWork = workInProgressRoot; // 下一单元任务
    deletions = [];
    // element => node
    // const element = createNode(vnode, container);
    // container?.appendChild(element);
}

/**
 * 执行当前任务
 * 返回下一个任务
  */
function performUnitOfWork(fiber: Fiber) {
    // 执行当前任务
    const { type } = fiber;

    // console.log('perform-unit-work' + type);
    // console.log(fiber);


    if(typeof type === 'function') {
        type.isReactComponent
            ? updateClassComponent(fiber) /* class组件 */
            : updateFunctionComponent(fiber) /* function 组件 */
    }
    else {
        updateHostComponent(fiber);
    }

    // 任务2： 返回下一个要更新的fiber
    // 顺序是： 子节点，兄弟，父节点，或者祖先的兄弟
    if(fiber.child) {
        return fiber.child;
    }
    let nextFiber = fiber;
    while(nextFiber) {
        if(nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.return;
    }

}

interface IDeadLine {
    didTimeout: boolean;
    timeRemaining(): number;
}

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

function workLoop (deadline: IDeadLine) {

    // 如果nextUnitOfWork和时间:deadline的剩余时间还够
    while(nextUnitOfWork && deadline.timeRemaining() > 1) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }

    if(!nextUnitOfWork && workInProgressRoot) {
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
