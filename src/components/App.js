import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import AuthLink from './AuthLink';
import Footer from './Footer';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(e) {
    e.preventDefault();
    this.props.route.auth.login();
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.route.auth.logout();
    this.props.router.replace({ pathname: '/login' });
  }

  render() {
    const children = React.cloneElement(this.props.children, {
      auth: this.props.route.auth
    });

    return (
      <div>
        <header className="site-header">
          <nav role="navigation" className="navbar navbar-default">
            <div className="container">
              <div className="navbar-header">
                <button type="button" data-toggle="collapse" data-target="#navbar-collapse" className="navbar-toggle"><span className="sr-only">Toggle navigation</span><span className="icon-bar" /><span className="icon-bar"/><span className="icon-bar" /></button>
                <h1 className="navbar-brand">
                  <a href="/"><span>Auth0</span></a>
                </h1>
              </div>
              <div id="navbar-collapse" className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <AuthLink 
                      loggedIn={this.props.route.auth.loggedIn()} 
                      logInHandler={this.handleLogin}
                      logOutHandler={this.handleLogout} />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        
        {children}

        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default withRouter(App);
