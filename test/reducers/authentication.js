import expect from 'expect';
import reducer from '../../src/reducers/authentication';
import * as at from '../../src/actions/actionTypes';

describe('Reducers', () => {
  describe('authentication', () => {
    const initialState = {
      loggedIn: false,
      token: null
    };

    it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should handle LOGIN_USER', () => {
      const token = "USERTOKEN:12345";
      
      const action = {
        type: at.LOGIN_USER,
        loggedIn: true,
        token: token
      };
      const expectedState = {
        ...initialState,
        loggedIn: true,
        token: token
      };

      expect(reducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle LOGOUT_USER', () => {
      const action = {
        type: at.LOGOUT_USER
      };
      const expectedState = initialState;
      

      expect(reducer(initialState, action)).toEqual(expectedState);
    });
  });
});
