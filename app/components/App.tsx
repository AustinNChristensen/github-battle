import * as React from 'react';
import Popular from './Popular';
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Switch = ReactRouter.Switch;
var Results = require('./Results');


export default class App extends React.Component <any, any>{
    render() {
        return (
            <Router>
                 <div className="container">
                    <Nav/>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/results' component={Results} />
                        <Route path='/popular' component={Popular} />
                        <Route render={function() {
                            return <p>Not Found</p>
                        }}/>
                    </Switch>
                 </div>
            </Router>
        )
    }
}