import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import AuthService from './utils/AuthService';
import reducers from './reducers/';
import App from './components/App';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';

import './scss/index.scss';

const store = createStore(reducers, applyMiddleware(ReduxThunk));
const auth = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, store);

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} auth={auth}>
        <IndexRedirect to="/home" />
        <Route path="home" component={Home} onEnter={requireAuth}/>
        <Route path="login" component={Login} />
        <Route path="access_token*" component={Loading}/>
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
