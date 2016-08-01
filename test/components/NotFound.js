import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../../src/components/NotFound';

describe('Components', () => {
  describe('NotFound', () => {
    it('renders div with text Nothing Found Here ', () => {
      const wrapper = shallow(<NotFound />);
      const element = wrapper.find('div');

      expect(element.text()).toBe('Nothing Found Here');
    });
  });
});
