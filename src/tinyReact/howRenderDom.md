# 如何实现将jsx初次渲染到浏览器
- react的组件可以有多种，如函数组件、类组件、fragment、portals, 还有普通HTML标签组件；如何将这些形态各异的组件渲染到浏览器页面呢？

## 从一个普通HTML组件开始
- 在react里，一个组件应该写进以jsx、tsx结尾的文件里，然后它就神奇的渲染到了浏览器，这是为何？一个tsx/jsx文件，并没有使用React，它也必须引入，这是道德的沦丧？
  - 一个普通组件，写进tsx/jsx，babel就自动使用bable-loader将其编译成某种格式的对象；这个格式如下：
    ```react
        {
            type: string;
            config: {};
            children: []
        }
    ```

    此时react会调用createElement，将其处理成{type, props}的一个对象；再将这个对象连带它要渲染的父级节点传给ReactDom里的render函数；render函数接收到这两个参数：VNode和container；会将虚拟节点处理成真实节点，再添加到container;

  - 调用createNode方法
