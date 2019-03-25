import * as React from 'react';
// var React = require('react');
var ReactDOM = require('react-dom');
require('../styles/index.css');

class App extends React.Component <Object>{
    render() {
        return (
            <div>
                Hello Friends!
            </div>
        )
    }

}
ReactDOM.render(
    <App/>, document.getElementById('app') as HTMLElement
);