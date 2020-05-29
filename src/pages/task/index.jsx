import React from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import TaskDashBoardPage from './Dashboard';
import TaskCreatePage from './CreateTask';

function Task() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={TaskDashBoardPage} />
      <Route path={`${match.url}/createTask`} component={TaskCreatePage} />
    </Switch>
  )
}

export default Task;