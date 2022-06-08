class Component {
    static isReactComponent = {};
    props: Record<string, any>;
    context: any;
    refs: {};
    state: {};
    forceUpdate() {
        console.log('forceupdate---');

    }
    setState() {
        console.log('setState');

    }

    constructor(props: Record<string, any>, context: any, state: any) {
        this.props = props;
        this.context = context;
        this.refs = {};
        this.state = state;
    }
}

export default Component;
