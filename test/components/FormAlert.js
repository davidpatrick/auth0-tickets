import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import FormAlert from '../../src/components/FormAlert';

function setup(options = {}) {
  const props = {
    success: options.success || false,
    errors: options.errors || []
  };

  const wrapper = shallow(<FormAlert {...props} />);

  return {
    props,
    wrapper
  };
}

describe('Components', () => {
  describe('FormAlert', () => {
    describe('when success is true', () => {
      const { wrapper } = setup({success: true});

      it('should render div with class alert-success', () => {
        const element = wrapper.find('div.alert-success');

        expect(element.length).toBe(1);
      });
    });

    describe('when when success is false and errors exists', () => {
      const { wrapper } = setup({errors: ['Test', 'Test']});

      it('should render div with class alert-danger', () => {
        const element = wrapper.find('div.alert-danger');

        expect(element.length).toBe(1);
      });

      it('should render ul for errors list', () => {
        const element = wrapper.find('ul');

        expect(element.length).toBe(1);
      });

      it('should render li for each error', () => {
        const element = wrapper.find('li');

        expect(element.length).toBe(2);
      });

      it('should render error text', () => {
        const element = wrapper.find('li').first();

        expect(element.text()).toBe('Test');
      });
    });

    describe('when success is false and errors is empty', () => {
      const { wrapper } = setup({});

      it('should return null', () => {
        const element = wrapper;

        expect(element.equals(null)).toBe(true);
      });
    });

  });
});
