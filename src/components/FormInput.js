import React, { PropTypes } from 'react';

const defaultInputAttrs = {
  rows: 5,
  className: 'form-control'
};

const FormInput = ({type, name, value, placeholder, onChange, defaults=defaultInputAttrs}) => {
  // Currently there are only two types of form inputs supported defaults to input
  switch(type) {
    case 'textarea':
      return (
        <textarea 
          name={name} 
          value={value} 
          rows={defaults.rows}
          placeholder={placeholder}
          onChange={onChange} 
          className={defaults.className} />
      );
    default:
      return (
        <input
          name={name} 
          value={value} 
          type={type}
          placeholder={placeholder}
          onChange={onChange} 
          className={defaults.className} />
      );
  }
};

FormInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  placeholder: PropTypes.string.isRequired,
  defaults: PropTypes.object
};

export default FormInput;
