import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthService from '../utils/AuthService';

export class Login extends React.Component {
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
      <section className="jumbotron">
        <h2>
          <i aria-hidden="true" className="icon-budicon-72 icon" />
        </h2>

        <h1>Auth0 Ticketing System</h1>
        <p>Login to create a support ticket on behalf of a customer.</p>
        <button onClick={this.handleClick} className="btn btn-success btn-lg">Login</button>
      </section>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.instanceOf(AuthService)
};

const mapStateToProps = state => {
  return {
    authentication: state.authentication
  };
};

export default connect(mapStateToProps, null)(Login);
