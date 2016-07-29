import React, { PropTypes } from 'react';
import FormAlert from './FormAlert';
import FormInput from './FormInput';
import Loading from './Loading';

const Form = ({fields, values, success, errors, loading, handleInputChange, handleFormSubmission}) => {
  if (fields.length > 0) {
    return (
      <form className="form-horizontal" onSubmit={handleFormSubmission}>
        <div className="col-md-offset-1">
          <FormAlert success={success} errors={errors} />
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
                  options={field.options}
                  onChange={handleInputChange} />
              </div>
            </div>
          );
        })}

        <div className="pull-right">
          {loading ? <Loading /> : <input className="btn btn-default" type="submit" value="Submit" />}
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
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool,
  errors: PropTypes.array
};

export default Form;
