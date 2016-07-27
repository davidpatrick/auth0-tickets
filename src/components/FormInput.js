import React, { PropTypes } from 'react';

const defaultInputAttrs = {
  rows: 5,
  className: 'form-control'
};

const FormInput = ({type, name, value, placeholder, onChange, options={}}) => {
  // Merge Component Defaults with Options passed in
  options = {...defaultInputAttrs, ...options};

  // Currently there are only two types of form inputs supported defaults to input
  switch(type) {
    case 'textarea':
      return (
        <textarea 
          name={name} 
          value={value} 
          placeholder={placeholder}
          onChange={onChange} 
          className={options.className}
          required={options.required} 
          rows={options.rows} />
      );
    default:
      return (
        <input
          name={name} 
          value={value} 
          placeholder={placeholder}
          onChange={onChange} 
          className={options.className} 
          required={options.required} 
          type={type} />
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
  options: PropTypes.object
};

export default FormInput;
