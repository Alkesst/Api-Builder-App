import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
    App,
    Login,
    StickyNav,
    ConfigurationEditor,
} from 'Components';
import ProjectsView from './ProjectManagement';
import ProjectInfo from './ProjectInfo';

const Routes: React.FC = () => (
    <div>
        <StickyNav />
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/projects/:id" component={ProjectInfo} />
            <Route path="/projects" component={ProjectsView} />
            <Route path="/configs/editor" component={ConfigurationEditor} />
            <Route exact path="/" component={App} />
        </Switch>
    </div>
);

export default Routes;
