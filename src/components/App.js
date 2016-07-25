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
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};
