import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/home';
import RegisterPage from './pages/register';
import LoginPage from './pages/login';
import Task from './pages/task';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/register' component={RegisterPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route path='/tasks' component={Task}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
