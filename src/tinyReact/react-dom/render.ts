import { ReactElement } from 'react';

export function render(
    element: ReactElement<unknown>,
    container: Element | Document | DocumentFragment | null,
    // callback?: () => void
): void {
    // element => node
    console.log(element);

    console.log(container);

    // const node = createNode(element);
    // container?.appendChild(element);
}

// function createNode(vnode) {
//     let node;
//     const { type } = vnode;
//     if(type ===TEXT) {
//         node = document.createTextNode()
//     }
//     node = document.createElement(type);
//     return node;
// }
