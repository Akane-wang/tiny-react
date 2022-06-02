import { TEXT } from '../const';

function createNode(vnode: { props?: any; type?: any; }): Node {
    let node;
    const { type } = vnode;
    if(type === TEXT) {
        node = document.createTextNode(vnode.props.nodeValue);
    }
    node = document.createElement(type);
    return node;
}

function render(
    vnode: any,
    container: Element | Document | DocumentFragment,
    // callback?: () => void
): void {
    // element => node
    console.log(vnode);

    const element = createNode(vnode);
    container.appendChild(element);

    // const node = createNode(element);
    // container?.appendChild(element);
}

export default render;
