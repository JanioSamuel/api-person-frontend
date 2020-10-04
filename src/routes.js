import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Form from './pages/Form';
import List from './pages/List';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/form" component={Form} />
                <Route path="/list" component={List} />
                <Route path="/unauthorized" component={Unauthorized} />
            </Switch>
        </BrowserRouter>
    )
}
