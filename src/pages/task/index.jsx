import React from 'react';
import { Switch, useRouteMatch, Route, Redirect } from 'react-router-dom';
import TaskDashBoardPage from './Dashboard';
import TaskCreatePage from './CreateTask';
import { decodeToken } from '../../services/auth.service';

function Task() {
  const match = useRouteMatch();

  return (
    <>
      {
        !decodeToken() ?
          <Redirect to='/login'></Redirect> 
          :
          <Switch>
            <Route exact path={match.url} component={TaskDashBoardPage} />
            <Route path={`${match.url}/createTask`} component={TaskCreatePage} />
          </Switch>
      }
    </>
  )
}

export default Task;