import React, { PropTypes } from 'react';
import FormAlert from './FormAlert';
import FormInput from './FormInput';

const Form = ({fields, values, success, error, handleInputChange, handleFormSubmission}) => {
  if (fields.length > 0) {
    return (
      <form className="form-horizontal" onSubmit={handleFormSubmission}>
        <div className="col-xs-offset-1">
          <FormAlert success={success} error={error} />
        </div>

        {fields.map(field => {
          let value = values[field.name];

          return (
            <div key={field.name} className="form-group">
              <label className="col-xs-3 control-label">
                {field.label}
              </label>

              <div className="col-xs-9">
                <FormInput 
                  name={field.name} 
                  value={value} 
                  type={field.type}
                  placeholder={field.placeholder}
                  options={{required: true}}
                  onChange={handleInputChange} />
              </div>
            </div>
          );
        })}

        <div className="pull-right">
          <input className="btn btn-default" type="submit" value="Submit" />
        </div>
      </form>
    );
  } else {
    return <div></div>;
  }
};

Form.propTypes = {
  handleFormSubmission: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  success: PropTypes.bool,
  error: PropTypes.string
};

export default Form;
