import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './privateRoute';

import Register from './components/Register';
import Login from './components/Login';
import Users from './components/Users';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute path="/users" component={Users} />
    </div>
  );
}

export default App;
