import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import AuthLink from '../../src/components/AuthLink';

function setup(loggedIn = false) {
  const props = {
    loggedIn: loggedIn,
    logInHandler: expect.createSpy(),
    logOutHandler: expect.createSpy()
  };

  const wrapper = shallow(<AuthLink {...props} />);

  return {
    props,
    wrapper
  };
}

describe('Components', () => {
  describe('AuthLink', () => {
    describe('when loggedIn', () => {
      const { wrapper, props } = setup(true);

      it('should render logout link', () => {
        const element = wrapper.find('a');

        expect(element.props().href).toBe('logout');
      });

      it('should render login link text', () => {
        const element = wrapper.find('a');

        expect(element.text()).toBe('Logout');
      });

      describe('when AuthLink clicked', () => {
        const element = wrapper.find('a');
        element.props().onClick();
        
        it('should call logOutHandler', () => {
          expect(props.logOutHandler).toHaveBeenCalled();
        });
      });
    });

    describe('when loggedOut', () => {
      const { wrapper, props } = setup();

      it('should render login link', () => {
        const element = wrapper.find('a');

        expect(element.props().href).toBe('login');
      });

      it('should render login link text', () => {
        const element = wrapper.find('a');

        expect(element.text()).toBe('Login');
      });

      describe('when AuthLink clicked', () => {
        const element = wrapper.find('a');
        element.props().onClick();
        
        it('should call logInHandler', () => {
          expect(props.logInHandler).toHaveBeenCalled();
        });
      });
    });
  });
});
