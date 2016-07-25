import React, { PropTypes } from 'react';
import AuthService from '../utils/AuthService';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { auth } = this.props;

    auth.login();
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <button onClick={this.handleClick}>
          Login
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.instanceOf(AuthService)
};