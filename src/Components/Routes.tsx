import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    App,
    Login,
    StickyNav,
    ProjectManagement,
    ConfigurationEditor,
} from 'Components';

const Routes: React.FC = () => (
    <div>
        <StickyNav />
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/projects" component={ProjectManagement} />
            <Route path="/configs/editor" component={ConfigurationEditor} />
            <Route exact path="/" component={App} />
        </Switch>
    </div>
);

export default Routes;
