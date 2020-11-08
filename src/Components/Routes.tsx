import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './Login';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/login" component={Login} />
        <Route path="/features" component={App} />
        <Route exact path="/" component={App} />
    </Switch>
);

export default Routes;
