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

interface ICreateElementProps {
    type: string;
    props: {
        children: unknown[];
        nodeValue?: unknown;
    };
}

// 主要目的： 把jsx编译出来的参数搞成虚拟dom节点
/**
 *
 * @param type 标签名
 * @param config 标签元素
 * @param children 子节点，子节点的属性设置依然和当前层一样
 */
function createElement(
    type: string, // 标签名：普通的HTML标签，函数组件标签，class标签，fragment标签
    // 标签的属性，以对象形式出现，如{color: 'red', className: 'style-class'} ?? null; Record<string, any> ?? null
    config: {
        _self: unknown;
        _source: unknown;
    },
    ...children: any[]
): ICreateElementProps {
    if(config) {
        delete config._self;
        delete config._source;
    }
    const props = {
        ...config,
        children: children.map(child => typeof child === 'object' ? child : createTextNode(child))
    };
    return {
        type,
        props
    };
}

export default { createElement };
