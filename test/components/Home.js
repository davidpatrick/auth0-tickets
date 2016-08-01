import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { Home } from '../../src/components/Home';

function setup() {
  const props = {
    form: {
      fields: [],
      values: {},
      success: true,
      errors: true,
      loading: true
    },
    authentication: {},
    buildForm: function(){},
    updateFormValue: function(){},
    submitForm: function(){}
  };

  const wrapper = shallow(<Home {...props} />);

  return {
    props,
    wrapper
  };
}

describe('Components', () => {
  describe('Home', () => {
    it('should render one main', () => {
      const { wrapper } = setup();
      const element = wrapper.find('main');

      expect(element.length).toBe(1);
    });

    it('should render two sections', () => {
      const { wrapper } = setup();
      const element = wrapper.find('section');

      expect(element.length).toBe(2);
    });

    it('should render one section with content-header class', () => {
      const { wrapper } = setup();
      const element = wrapper.find('section.content-header');

      expect(element.length).toBe(1);
    });

    it('should render one h1', () => {
      const { wrapper } = setup();
      const element = wrapper.find('h1');

      expect(element.length).toBe(1);
    });

    it('should render one Form component', () => {
      const { wrapper } = setup();
      const element = wrapper.find('Form');

      expect(element.length).toBe(1);
    });

    it('should render Form component with props', () => {
      const { wrapper, props } = setup();
      const element = wrapper.find('Form');
      const elementProps = element.props();

      expect(elementProps.fields).toEqual(props.form.fields);
      expect(elementProps.values).toEqual(props.form.values);
      expect(elementProps.success).toEqual(props.form.success);
      expect(elementProps.errors).toEqual(props.form.errors);
      expect(elementProps.loading).toEqual(props.form.loading);
      expect(elementProps.handleInputChange).toExist();
      expect(elementProps.handleFormSubmission).toExist();
    });
  });
});
