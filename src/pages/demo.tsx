import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    public render(): React.ReactElement {
        console.log('打印一下');

        return (
            <div className={ 'app-wrap' }>
                hello a
                {/* {
                    this.props.children
                } */}
            </div>
        );
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
