import * as at from './actionTypes';
import fetch from 'isomorphic-fetch';

const handleFormError = error => {
  return dispatch => dispatch({
    type: at.FORM_ERRORS,
    error: error.message
  });
};

const handleFormSuccess = response => {
  return dispatch => dispatch({
    type: at.FORM_SUCCESS
  });
};

export const formBuild = fields => {
  const values = {};
  fields.forEach(field => {
    values[field.name] = field.value || '';
  });

  return {
    type: at.FORM_BUILD,
    fields,
    values
  };
};

export const formSubmit = (url, values) => {
  return dispatch => {
    dispatch({type: at.FORM_SUBMIT});

    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Auth-Token': localStorage.getItem('id_token')
      }
    }).then(response => response.json())
      .then(json => dispatch(handleFormSuccess(json)))
      .catch(error => dispatch(handleFormError(error)));
  };
};

export const formUpdateValue = (name, value) => ({
  type: at.FORM_UPDATE_VALUE,
  name, 
  value
});

export const loginUser = token => ({
  type: at.LOGIN_USER,
  token
});

export const logoutUser = () => ({
  type: at.LOGOUT_USER
});
