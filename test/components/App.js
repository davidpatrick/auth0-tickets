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

    it('should render one AuthLink', () => {
      const { wrapper } = setup();
      const element = wrapper.find('AuthLink');

      expect(element.length).toBe(1);
    });
  });
});
