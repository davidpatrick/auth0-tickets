import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../../src/components/Loading';

describe('Components', () => {
  describe('Loading', () => {
    it('renders div with spinner class', () => {
      const wrapper = shallow(<Loading />);
      const element = wrapper.find('div.spinner');

      expect(element.length).toBe(1);
    });

    it('renders div with circle class', () => {
      const wrapper = shallow(<Loading />);
      const element = wrapper.find('div.circle');

      expect(element.length).toBe(1);
    });
  });
});
