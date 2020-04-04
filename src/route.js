import React from 'react';
import {Route,HashRouter} from 'react-router-dom';
import Home from './routes/Home';

const RouterConfig =()=>{
    return (
        <HashRouter>
            <Route path="/" component={Home}></Route> 
        </HashRouter>
    )
}
export default RouterConfig