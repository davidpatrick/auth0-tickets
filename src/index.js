import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import App from './components/App';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';

render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/home" />
      <Route path="home" component={Home} />
      <Route path="login" component={Login} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>,
  document.getElementById('root')
);