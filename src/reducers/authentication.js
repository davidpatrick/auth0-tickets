import * as at from '../actions/actionTypes';

const initialState = {
  loggedIn: false,
  token: null
};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case at.LOGIN_USER:
      return {
        loggedIn: true,
        token: action.token
      };
    case at.LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default authentication;
