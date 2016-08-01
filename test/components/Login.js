import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { createStubInstance } from 'sinon';
import AuthService from '../../src/utils/AuthService';
import { Login } from '../../src/components/Login';


function setup() {
  const stubbedAuthService = createStubInstance(AuthService);
  stubbedAuthService.login = expect.createSpy();

  const props = {
    auth: stubbedAuthService
  };

  const wrapper = shallow(<Login {...props} />);

  return {
    props,
    wrapper
  };
}

describe('Components', () => {
  describe('Login', () => {
    it('renders section with jumbotron class', () => {
      const { wrapper } = setup();
      const element = wrapper.find('section');

      expect(element.hasClass('jumbotron')).toBe(true);
    });

    it('should render one h2', () => {
      const { wrapper } = setup();
      const element = wrapper.find('h2');

      expect(element.length).toBe(1);
    });

    it('should render .icon-budicon-72 inside of h2', () => {
      const { wrapper } = setup();
      const element = wrapper.find('h2 .icon-budicon-72');

      expect(element.length).toBe(1);
    });

    it('should render one h1', () => {
      const { wrapper } = setup();
      const element = wrapper.find('h1');

      expect(element.length).toBe(1);
    });

    it('should render the title inside of h1', () => {
      const { wrapper } = setup();
      const element = wrapper.find('h1');

      expect(element.text()).toBe('Auth0 Ticketing System');
    });

    it('should render one p', () => {
      const { wrapper } = setup();
      const element = wrapper.find('p');

      expect(element.length).toBe(1);
    });

    it('should render one button', () => {
      const { wrapper } = setup();
      const element = wrapper.find('button');

      expect(element.length).toBe(1);
    });

    it('should render Login text inside of button', () => {
      const { wrapper } = setup();
      const element = wrapper.find('button');

      expect(element.text()).toBe('Login');
    });

    it('should call props.auth.login on button click', () => {
      const { wrapper, props } = setup();
      const element = wrapper.find('button');

      element.props().onClick('test');
      expect(props.auth.login.calls.length).toBe(1);
    });
  });
});
