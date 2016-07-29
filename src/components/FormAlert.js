import React, { PropTypes } from 'react';
import FormInput from './FormInput';

const FormAlert = ({success, errors}) => {
  if (success) {
    return (
      <div className="alert alert-success">
        Ticket successfully created!
      </div>
    );
  } else if (errors && errors.length > 0) {
    return (
      <div className="alert alert-danger">
        <ul>
          {errors.map(error => <li key={error}> {error} </li>)}
        </ul>
      </div>
    );
  } else {
    return  null;
  }
};

FormAlert.propTypes = {
  success: PropTypes.bool,
  errors: PropTypes.array
};

export default FormAlert;
