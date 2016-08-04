import React, { PropTypes } from 'react';
import FormInput from './FormInput';

const AuthLink = ({loggedIn, logInHandler, logOutHandler}) => {
  const link = {
    href: loggedIn ? 'logout' : 'login',
    text: loggedIn ? 'Logout' : 'Login',
    clickHandler: loggedIn ? logOutHandler : logInHandler
  };

  return (
    <a 
      href={link.href} 
      onClick={link.clickHandler} 
      data-toggle="collapse"
      data-target="#navbar-collapse">
      {link.text}
    </a>
  );
};

AuthLink.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logInHandler: PropTypes.func.isRequired,
  logOutHandler: PropTypes.func.isRequired
};

export default AuthLink;
