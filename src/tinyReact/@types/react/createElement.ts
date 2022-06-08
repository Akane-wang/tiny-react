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
