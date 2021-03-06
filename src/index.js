import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import AuthService from './utils/AuthService';
import reducers from './reducers/';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import AppContainer from './components/App';
import HomeContainer from './components/Home';
import LoginContainer from './components/Login';

import './scss/index.scss';

const store = createStore(reducers, applyMiddleware(ReduxThunk));
const auth = new AuthService(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, store, browserHistory);

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' });
  }
};

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} auth={auth}>
        <IndexRedirect to="/home" />
        <Route path="home" component={HomeContainer} onEnter={requireAuth}/>
        <Route path="login" component={LoginContainer} />
        <Route path="*" component={NotFound}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
