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
        defaults: action.values,
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
        ...state,
        error: null,
        loading: true,
        success: false
      };
    case at.FORM_SUCCESS:
      return {
        ...state,
        values: state.defaults,
        error: null,
        loading: false,
        success: true
      };
      case at.FORM_ERRORS:
        return {
          ...state,
          error: action.error
        };
    default:
      return state;
  }
};

export default form;
