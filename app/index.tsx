import * as React from 'react';
import ReactDOM from 'react-dom';
require('./styles/index.css');
import App  from "./components/App";

ReactDOM.render(
    <App/>, 
    document.getElementById('app') as HTMLElement
);