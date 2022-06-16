import React
// { useState }
from '@/tinyReact/react';
import ReactDOM from '@/tinyReact/react-dom';
import { CSSProperties } from 'react';

const JsxFunc = (props: {name: string}) => {
    // const [count, setCount] = useState(0);
    const count = 0;
    return (
        <div className="border">
            {props.name}
            <button
                // onClick={() => setCount(count + 1)}
            > {count}: count add</button>
            <div className="border">
                { count % 2
                    ? (
                        <button onClick={() => console.log("omg")}>click</button>
                    )
                    : (
                        <div>omg</div>
                    )
                }
            </div>
        </div>
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
        <JsxFunc name={ 'jsx-function' }/>
        <App color={ 'pink' }/>
        <JsxClass />
    </div>
)

ReactDOM.render(
    jsx,
    document.getElementById('root')
);
