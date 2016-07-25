import * as at from './actionTypes';

const handleFormError = error => ({
  type: at.FORM_ERRORS,
  error: error.message
});

const handleFormSuccess = () => ({
  type: at.FORM_SUCCESS
});

export const formSubmit = url => {
  return dispatch => {
    dispatch({type: at.FORM_SUBMIT});

    return fetch(url, {
      headers: {
        'Auth-Token': localStorage.getItem('id_token')
      }
    }).then(response => response.json())
      .then(json => dispatch(handleFormSuccess))
      .catch(error => dispatch(handleFormError));
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
