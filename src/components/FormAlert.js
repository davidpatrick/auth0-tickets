import React, { PropTypes } from 'react';
import FormInput from './FormInput';

const FormAlert = ({success, error}) => {
  if (success) {
    return <div className="alert alert-success">
      This form does not yet post real data!  This is a test.
    </div>;
  } else if (error) {
    return <div className="alert alert-danger">
      There was an error: {error}
    </div>;
  } else {
    return  null;
  }
};

FormAlert.propTypes = {
  success: PropTypes.bool,
  error: PropTypes.string
};

export default FormAlert;
