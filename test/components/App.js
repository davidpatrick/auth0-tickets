import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../src/components/App';

function setup(options={loggedIn: false}) {
  const props = {
    children: {},
    route: {
      auth: {
        login: expect.createSpy(),
        logout: expect.createSpy(),
        loggedIn: expect.createSpy().andReturn(options.loggedIn)
      }
    },
    router: {
      replace: expect.createSpy()
    }
  };

  const wrapper = shallow(<App {...props} />);

  return {
    props,
    wrapper
  };
}

describe('Components', () => {
  describe('App', () => {
    it('should render one header', () => {
      const { wrapper } = setup();
      const element = wrapper.find('header');

      expect(element.length).toBe(1);
    });

    it('should render one nav', () => {
      const { wrapper } = setup();
      const element = wrapper.find('nav');

      expect(element.length).toBe(1);
    });

    it('should render one h1', () => {
      const { wrapper } = setup();
      const element = wrapper.find('h1');

      expect(element.length).toBe(1);
    });

    it('should render title in h1 span', () => {
      const { wrapper } = setup();
      const element = wrapper.find('h1 span');

      expect(element.text()).toBe('Auth0');
    });

    it('should render one Footer', () => {
      const { wrapper } = setup();
      const element = wrapper.find('Footer');

      expect(element.length).toBe(1);
    });

    describe('when loggedIn', () => {
      const { wrapper, props } = setup({loggedIn: true});

      it('should render logout link', () => {
        const element = wrapper.find('#auth-link');

        expect(element.props().href).toBe('logout');
      });

      it('should render login link text', () => {
        const element = wrapper.find('#auth-link');

        expect(element.text()).toBe('Logout');
      });

      describe('when #auth-link clicked', () => {
        const element = wrapper.find('#auth-link');
        element.props().onClick({preventDefault: ()=>{} });
        
        it('should call props.route.auth.logout', () => {
          expect(props.route.auth.logout).toHaveBeenCalled();
        });

        it('should call props.router.replace with /login', () => {
          expect(props.router.replace).toHaveBeenCalledWith({
            pathname: '/login'
          });
        });
      });
    });

    describe('when loggedOut', () => {
      const { wrapper, props } = setup({loggedIn: false});

      it('should render login link', () => {
        const element = wrapper.find('#auth-link');

        expect(element.props().href).toBe('login');
      });

      it('should render login link text', () => {
        const element = wrapper.find('#auth-link');

        expect(element.text()).toBe('Login');
      });

      describe('when #auth-link clicked', () => {
        const element = wrapper.find('#auth-link');
        element.props().onClick({preventDefault: ()=>{} });
        
        it('should call props.route.auth.login', () => {
          expect(props.route.auth.login).toHaveBeenCalled();
        });
      });
    });
  });
});
