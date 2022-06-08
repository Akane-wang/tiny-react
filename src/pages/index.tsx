import React from '@/tinyReact/react';
import ReactDOM from '@/tinyReact/react-dom';
import { CSSProperties } from 'react';

const JsxFunc = () => {
    return (
        <div className={ 'jsxFunction' }>jsxFunction</div>
    )

};

class JsxClass extends React.Component {
    render(): React.ReactElement {
        return (
            <div className={ 'class-jsx' }>classJsx</div>
        )
    }
}

class App extends React.Component {
    static defaultProps: { color: string; };

    public render(): React.ReactElement {

        console.log(this.props.color);
        return (
            <div
                className={ 'app-wrap' }
                style={{ 'color': this.props.color, '--width': 'max-content' } as CSSProperties }
            >
                hello 李银河 { this.props.color }
            </div>
        );
    }
}

App.defaultProps = {
    color: 'red'
}

const jsx = (
    <div className={ 'jsx-color' }>
        <JsxFunc />
        <App color={ 'pink' }/>
        <JsxClass />
    </div>
)

ReactDOM.render(
    jsx,
    document.getElementById('root')
);
