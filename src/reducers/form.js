import * as at from '../actions/actionTypes';

const initialState = {
  errors: null,
  loading: false,
  success: false,
  fields: [],
  values: {},
  defaults: {}
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
        success: false,
        values: {
          ...state.values,
          [action.name]: action.value
        }
      };
    case at.FORM_SUBMIT:
      return {
        ...state,
        errors: null,
        loading: true,
        success: false
      };
    case at.FORM_SUCCESS:
      return {
        ...state,
        values: state.defaults,
        errors: null,
        loading: false,
        success: true
      };
    case at.FORM_ERRORS:
      return {
        ...state,
        errors: action.errors,
        loading: false,
        success: false
      };
    default:
      return state;
  }
};

export default form;
