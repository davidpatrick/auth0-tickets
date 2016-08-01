import expect from 'expect';
import reducer from '../../src/reducers/form';
import * as at from '../../src/actions/actionTypes';

describe('Reducers', () => {
  describe('form', () => {
    const initialState = {
      errors: null,
      loading: false,
      success: false,
      fields: [],
      values: {},
      defaults: {}
    };

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle FORM_UPDATE_VALUE', () => {
      const inputValue = {name: 'email', value: 'test@example.org'};

      const action = {
        type: at.FORM_UPDATE_VALUE,
        ...inputValue      
      };
      const expectedState = {
        ...initialState,
        success: false,
        values: {
          email: 'test@example.org'
        }
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle FORM_SUBMIT', () => {
      const action = {
        type: at.FORM_SUBMIT
      };
      const expectedState = {
        ...initialState,
        errors: null,
        loading: true,
        success: false
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle FORM_SUCCESS', () => {
      const action = {
        type: at.FORM_SUCCESS
      };
      const expectedState = {
        ...initialState,
        errors: null,
        loading: false,
        success: true
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle FORM_ERRORS', () => {
      const errors = [{error: 'Invalid Request'}];
      
      const action = {
        type: at.FORM_ERRORS,
        errors: errors
      };
      const expectedState = {
        ...initialState,
        errors: errors,
        loading: false,
        success: false
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
