// import React from 'react';
// import ReactDOM from 'react-dom';
import React from '@/tinyReact/react';
import ReactDOM from '@/tinyReact/react-dom';
// import App from './demo';

const jsx = (
    <div className={ 'jsx-color' }>hello world</div>
);

// ReactDOM.render();
ReactDOM.render(
    jsx,
    document.getElementById('root')
);
