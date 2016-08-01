import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../src/components/Login';

function setup() {
  const props = {
    auth: {
      login: expect.createSpy()
    }
  };

  const enzymeWrapper = shallow(<Login {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Components', () => {
  describe('Login', () => {
    it('renders section with jumbotron class', () => {
      const { enzymeWrapper } = setup();
      const element = enzymeWrapper.find('section');

      expect(element.hasClass('jumbotron')).toBe(true);
    });

    it('should render one h2', () => {
      const { enzymeWrapper } = setup();
      const element = enzymeWrapper.find('h2');

      expect(element.length).toBe(1);
    });

    it('should render .icon-budicon-72 inside of h2', () => {
      const { enzymeWrapper } = setup();
      const element = enzymeWrapper.find('h2 .icon-budicon-72');

      expect(element.length).toBe(1);
    });

    it('should render one h1', () => {
      const { enzymeWrapper } = setup();
      const element = enzymeWrapper.find('h1');

      expect(element.length).toBe(1);
    });

    it('should render the title inside of h1', () => {
      const { enzymeWrapper } = setup();
      const element = enzymeWrapper.find('h1');

      expect(element.text()).toBe('Auth0 Ticketing System');
    });

    it('should render one p', () => {
      const { enzymeWrapper } = setup();
      const element = enzymeWrapper.find('p');

      expect(element.length).toBe(1);
    });

    it('should render one button', () => {
      const { enzymeWrapper } = setup();
      const element = enzymeWrapper.find('button');

      expect(element.length).toBe(1);
    });

    it('should render Login text inside of button', () => {
      const { enzymeWrapper } = setup();
      const element = enzymeWrapper.find('button');

      expect(element.text()).toBe('Login');
    });

    it('should call props.auth.login on button click', () => {
      const { enzymeWrapper, props } = setup();
      const element = enzymeWrapper.find('button');

      element.props().onClick('test');
      expect(props.auth.login.calls.length).toBe(1);
    });
  });
});
