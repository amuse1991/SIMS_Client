import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

import {
    HashRouter,
    Route
} from 'react-router-dom';

import {Login} from './page/Login';
import {Dashboard} from './page/Dashboard';
import {SatelliteDetail} from './page/SatelliteDetail';
import {Help} from './page/Help';

window.React = React;

/*
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/

ReactDOM.render(
    <HashRouter>
        <div className="main">
            <Route exact path = "/" component={Login}/>
            <Route path = "/dashboard" component={Dashboard}/>
            <Route path = "/detail/:satelliteId" component={SatelliteDetail}/>
            <Route path = "/help" component={Help}/>
        </div>
    </HashRouter>,document.getElementById('root')
)
registerServiceWorker();

