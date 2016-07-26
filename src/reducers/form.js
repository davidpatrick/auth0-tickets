import * as at from '../actions/actionTypes';

const initialState = {
  error: null,
  loading: false,
  success: false,
  fields: [],
  values: {}
};

const form = (state = initialState, action) => {
  switch (action.type) {
    case at.FORM_BUILD:
      return {
        ...initialState,
        fields: action.fields,
        values: action.values
      };
    case at.FORM_UPDATE_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value
        }
      };
    case at.FORM_SUBMIT:
      return {
        error: null,
        loading: true,
        success: false
      };
    case at.FORM_SUCCESS:
      return {
        ...initialState,
        ...state.fields,
        success: true
      };
      case at.FORM_ERRORS:
        return {
          ...initialState,
          ...state.fields,
          error: action.error
        };
    default:
      return state;
  }
};

export default form;
