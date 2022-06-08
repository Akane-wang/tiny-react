# 千里之行，始于足下
# 从0实现tiny-react
- 目的
  - 实现tiny-react,了解源码的实现机制，使用的技术，思想等
## 步骤一：
- [从react的入口开始，了解react是如何将jsx编译成可运行的DOM节点](./howRenderDom.md)
# 虚拟dom
- 理论
  - what
  - why
- 实现

# React核心api
```react
    const React = {
        Children: {
            map,
            forEach,
            count,
            toArray,
            only,
        },
        createRef,
        Component, //!important: 实现自定义组件
        PureComponent,

        createContext,
        forwardRef,
        lazy,
        memo,

        useCallback,
        useContext,
        useEffect,
        useImperativeHandle,
        useDebugValue,
        useLayoutEffect,
        useMemo,
        useReducer,
        useRef,
        useState,

        Fragment: REACT_FRAGMENT_TYPE,
        Profiler: REACT_PROFILER_TYPE,
        StrictMode: REACT_STRICT_MODE_TYPE,
        Suspense: REACT_SUSPENSE_TYPE,
        
        createElement: __DEV__ ? createElementWithValidation : createElement, //!important 创建虚拟DOM
        cloneElement: __DEV__ ? cloneElementWidthValidation : cloneElement,
        createFactory: __DEV__ ? createFactoryWithValidation : createFactory,
        isValidElement: isValidElement,

        version: ReactVersion,

        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
    };

    const ReactDOM = {
        render(element, container[, callback]), // 渲染真实DOM
        // 首次调用时，所有DOM 元素都会被替换，后续的调用则会使用React的DOM差分算法进行高效的更新
        // callback, 若被提供，则会在组件被渲染或更新之后被执行
    }
```

# 方法实现
render
createElement

# 源码实现
1. 实现reactDOM.render和React.createElement,让jsx编译成fiber
