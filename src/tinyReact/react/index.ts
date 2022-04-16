import { TEXT } from '../const';
// 把文本节点变成对象形式
function createTextNode(text: unknown): unknown {
    return {
        type: TEXT,
        props: {
            nodeValue: text,
            children: []
        }
    };
}

function createElement(
    type: unknown,
    config: {
        _self: unknown;
        _source: unknown;
    },
    ...children: any[]
): unknown {
    if(config) {
        delete config._self;
        delete config._source;
    }
    const props = {
        ...config,
        children: children.map(child => typeof child === 'object' ? 'child' : createTextNode(child))
    };
    return {
        type,
        props
    };
}

export default { createElement };
