import Auth0Lock from 'auth0-lock';
import { loginUser, logoutUser } from '../actions/';

export default class AuthService {
  constructor(clientId, domain, store) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {});
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
    // binds redux store
    this.reduxStore = store;
    // binds redux dispatch
    this.dispatch = store.dispatch;
  }

  _doAuthentication(authResult){
    // Saves the user token
    this.setToken(authResult.idToken);

    // Saves the expiration date
    localStorage.setItem('id_exp', authResult.idTokenPayload.exp);
  }

  dispatchLogin(token) {
    // Dispatches the user token to the redux store
    this.dispatch(loginUser(token));
  }

  dispatchLogout() {
   this.dispatch(logoutUser()); 
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();

    // Dispatch Login and Token if not already set
    if (token && !this.reduxStore.getState().authentication.loggedIn) {
      this.dispatchLogin(token);
    }

    return !!token;
  }

  setToken(idToken){
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    // Saves the user token to Redux Store
    this.dispatchLogin(idToken);
  }

  getToken(){
    // Retrieves the user token from localStorage
    return this.validateToken() ? localStorage.getItem('id_token') : null;
  }

  validateToken() {
    const tokenexpiresAt = localStorage.getItem('id_exp');
    return tokenexpiresAt && Date.now() < tokenexpiresAt * 1000;
  }

  logout(){
    // Clear user token info from localStorage and dispatch logout
    localStorage.removeItem('id_token');
    localStorage.removeItem('id_exp');
    this.dispatchLogout();
  }
}
