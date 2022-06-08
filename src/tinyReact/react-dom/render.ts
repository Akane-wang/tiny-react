import { TEXT } from '../const';
import { Container } from '@/tinyReact/@types/react-dom/render';


function reconcilerChildren(children: any[], node: Container): void {
    for(const child of children) {
        if(Array.isArray(child)) {
            reconcilerChildren(child, node);
        }
        else {
            render(child, node);
        }
    }
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

function updateNode(node: Container, props: Record<string, any>) {
    Object.keys(props)
        .filter(item => item !== 'children')
        .forEach(key => {
            if(/on/.test(key)) {
                node.addEventListener(key.slice(2).toLocaleLowerCase(), props[key]);
            }
            else if (key === 'style') {
                setValueForStyles(node, props[key]);
            }
            else {
                (node as any)[key] = props[key];
            }
        });
}

function updateClassComponent(vnode: { type: any; props: any; }, parentNode: Container | null): Container {
    const { type, props } = vnode;
    const vvnode = new type(props).render();
    const node = createNode(vvnode, parentNode);
    return node;
}

function updateFunctionComponent(vnode: { type: any; props: any; }, parentNode: Container | null): Container {
    const  { type, props } = vnode;
    const vvnode = type(props);
    const node = createNode(vvnode, parentNode);
    return node;

}
function createNode(vnode: { props: any; type: any; }, container: Container | null): Container {
    let node;
    const { type, props } = vnode;

    /* 文本节点 */
    if(type === TEXT) {
        node = document.createTextNode(vnode.props.nodeValue);
    }
    /* html标签节点 */
    else if(typeof type === 'string') {
        node = document.createElement(type);
    }

    else if(typeof type === 'function') {
        node = type.isReactComponent
            ? updateClassComponent(vnode, container) /* class组件 */
            : updateFunctionComponent(vnode, container) /* function 组件 */
    }

    /* 其他如portals组件 */
    /* fragment */
    else {
        node = document.createDocumentFragment();
    }

    reconcilerChildren(props.children, node); // 递归执行render
    updateNode(node, props);
    return node;
}

function render(
    vnode: any,
    container: Container | null,
    // callback?: () => void
): void {
    // element => node
    const element = createNode(vnode, container);
    container?.appendChild(element);
}

export default render;
