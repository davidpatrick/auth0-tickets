import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import * as actions from '../../src/actions';
import * as at from '../../src/actions/actionTypes';

const mockStore = configureMockStore([thunk]);

describe('Actions', () => {
  describe('when formBuild is dispatched', () => {
    it('should create FORM_BUILD with fields and values', () => {
      const fields = [
        {name: 'name', value: 'John Doe'},
        {name: 'email', value: 'test@example.org'}
      ];
      const values = {
        name: 'John Doe',
        email: 'test@example.org'
      };
      const expectedAction = {
        type: at.FORM_BUILD,
        fields,
        values
      };

      expect(actions.formBuild(fields)).toEqual(expectedAction);
    });
  });

  describe('when formSubmit is dispatched', () => {
    const url = 'http://auth0-tickets.com/api/v1/submit_ticket';
    const token = "USERTOKEN:12345";
    const values = {};

    afterEach(() => {
      nock.cleanAll();
    });

    it('should create FORM_SUCCESS when successfull', () => {
      const store = mockStore({});
      nock('http://auth0-tickets.com/api/v1').post('/submit_ticket').reply(200, {});

      const expectedActions = [
        { type: at.FORM_SUBMIT },
        { type: at.FORM_SUCCESS }
      ];

      return store.dispatch(actions.formSubmit(url, token, values))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should create FORM_ERRORS with errors when fails', () => {
      const store = mockStore({});
      const json = { error: "Invalid Request" };
      nock('http://auth0-tickets.com/api/v1').post('/submit_ticket').reply(400, json);
      
      const expectedActions = [
        { type: at.FORM_SUBMIT },
        { 
          type: at.FORM_ERRORS,
          errors: [].concat(json.error)
        }
      ];

      return store.dispatch(actions.formSubmit(url, token, values))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('when formUpdateValue is dispatched', () => {
    it('should create FORM_UPDATE_VALUE with name and value', () => {
      const name = "username";
      const value = "Test User";
      const expectedAction = {
        type: at.FORM_UPDATE_VALUE,
        name,
        value
      };

      expect(actions.formUpdateValue(name, value)).toEqual(expectedAction);
    });
  });

  describe('when loginUser is dispatched', () => {
    it('should create LOGIN_USER with token', () => {
      const token = "USERTOKEN:12345";
      const expectedAction = {
        type: at.LOGIN_USER,
        token
      };

      expect(actions.loginUser(token)).toEqual(expectedAction);
    });
  });

  describe('when logoutUser is dispatched', () => {
    it('should create LOGOUT_USER', () => {
      const expectedAction = {
        type: at.LOGOUT_USER
      };

      expect(actions.logoutUser()).toEqual(expectedAction);
    });
  });
});
