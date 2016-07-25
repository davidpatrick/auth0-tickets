import * as at from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  success: false,
};

const form = (state = initialState, action) => {
  switch (action.type) {
    case at.FORM_ERRORS:
      return {
        error: action.error,
        loading: false,
        success: false
      };
    case at.FORM_SUBMIT:
      return {
        error: null,
        loading: true,
        success: false
      };
    case at.FORM_SUCCESS:
      return {
        error: null,
        loading: false,
        success: true
      };
    case at.FORM_UPDATE_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value
        }
      };
    default:
      return state;
  }
};

export default form;
