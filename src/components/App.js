import React, { PropTypes } from 'react';
import AuthService from '../utils/AuthService';

export default class App extends React.Component {
  constructor(props) {
    super(props);
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
                <h1 className="navbar-brand"><a href="/"><span>Auth0</span></a></h1>
              </div>
              <div id="navbar-collapse" className="collapse navbar-collapse">
                <ul className="nav navbar-nav navbar-left no-basic">
                  <li><a href="/#/home">Home</a></li>
                  <li><a href="/#/logout">Logout</a></li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <div className="container">
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};
