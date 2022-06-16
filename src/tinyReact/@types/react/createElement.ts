import { ComponentLifecycle, ComponentState, Context, GetDerivedStateFromError, GetDerivedStateFromProps, ValidationMap, WeakValidationMap } from "react";

export type ClassType<P, T extends Component<P, ComponentState>, C extends ComponentClass<P>> =
        C &
        (new (props: P, context?: any) => T);
// export interface ICreateElementProps<P = {}, T extends Component<P, ComponentState>, C extends ComponentClass<P>> {
//     type: FunctionComponent<P> | ComponentClass<P> | string | ClassType<P, T, C>;
//     props?: Attributes & P | null |  ClassAttributes<ClassicComponent<P, ComponentState>> | ClassAttributes<T>;
//     children: ReactNode[];
// }

export interface ComponentClass<P = {}, S = ComponentState> extends StaticLifecycle<P, S> {
    new (props: P, context?: any): Component<P, S>;
    propTypes?: WeakValidationMap<P>;
    contextType?: Context<any>;
    contextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
}

interface StaticLifecycle<P, S> {
    getDerivedStateFromProps?: GetDerivedStateFromProps<P, S> | undefined;
    getDerivedStateFromError?: GetDerivedStateFromError<P, S> | undefined;
}

export interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<P>;
    defaultProps?: Partial<P>;
    displayName?: string;

}

type PropsWithChildren<P> = P & { children?: ReactNode }

type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;

type ReactFragment = {} | Iterable<ReactNode>;

type Key = string | number;

type ReactText = string | number;

type ReactChild = ReactElement | ReactText;

interface ReactPortal {
    key: Key | null;
    children: ReactNode;
}

export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
    type: T;
    props: P;
    key?: Key | null;
}

type JSXElementConstructor<P> = ((props: P) => ReactElement<any, any> | null) | (new (props: P) => Component<any, any>);

interface Component<P = {}, S = {}, SS = any> extends ComponentLifecycle<P, S, SS> { }

export type WorkTag = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;

export const FunctionComponent = 0;
export const ClassComponent = 1;
export const IndeterminateComponent = 2; // Before we know whether it is function or class
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
export const HostComponent = 5; // 普通类型节点
export const HostText = 6;
export const Fragment = 7;
export const Mode = 8;
export const ContextConsumer = 9;
export const ContextProvider = 10;
export const ForwardRef = 11;
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
export const IncompleteClassComponent = 17;
export const DehydratedFragment = 18;
export const SuspenseListComponent = 19;
export const ScopeComponent = 21;
export const OffscreenComponent = 22;
export const LegacyHiddenComponent = 23;
export const CacheComponent = 24;
export const TracingMarkerComponent = 25;

export interface Fiber<P = any> { // 25个属性
    tag?: WorkTag; // fiber的类型，根据ReactElement的type进行生成，在react内部共定义了25种tag
    key?: Key | null; // 和reactElement组件的key一致
    elementType?: any; // 和reactElement组件的type一致
    type?: any; // 和fiber.elementType一致；为兼容热更新会对function,class,forwardRef类型的ReactElement做一定处理，此时将会有别于elementType
    stateNode: any; // 与fiber关联的局部状态节点（HostComponent类型指向与fiber节点对应的dom节点；根节点fiber.stateNode指向firstRoot; class类型节点其stateNode指向的是class实例）
    return: Fiber; // 父节点
    child: Fiber | null; // 指向第一个子节点
    sibling: Fiber | null; // 指向下一个兄弟节点
    index?: number; // fiber在兄弟节点中的索引，如果是单节点，则默认为0
    props: P;
    base: Fiber | null;
    flags: Flags;
}


export type Flags = 'PLACEMENT' | 'UPDATE' | 'DELETION';
