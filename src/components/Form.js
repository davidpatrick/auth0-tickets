import React, { PropTypes } from 'react';

const Form = ({fields, values, handleInputChange}) => {
  if (fields.length > 0) {
    return (
      <form className="form-horizontal">
        {fields.map(field => {
          const value = values[field];

          return (
            <div key={field.name} className="form-group">
              <label className="col-xs-3 control-label">
                {field.label}
              </label>

              <div className="col-xs-9">
                <input 
                  name={field.name} 
                  value={value} 
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={handleInputChange} 
                  className="form-control" />
              </div>
            </div>
          );
        })}

        <div className="col-xs-offset-11">
          <input className="btn btn-default" type="submit" value="Submit" />
        </div>
      </form>
    );
  } else {
    return <div></div>;
  }
};

Form.propTypes = {
  handleFormSubmission: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired
};

export default Form;
