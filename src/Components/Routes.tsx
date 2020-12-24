import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './App';
import Login from './Login';
import StickyNav from './StickyNav';
import ProjectsView from './Projects';
import Grid from './ConfigEditor/Grid';

const Routes: React.FC = () => (
    <div>
        <StickyNav />
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/projects" component={ProjectsView} />
            <Route path="/configs/editor" component={Grid} />
            <Route exact path="/" component={App} />
        </Switch>
    </div>
);

export default Routes;
