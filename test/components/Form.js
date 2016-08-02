import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Form from '../../src/components/Form';

function setup(options = {}) {
  const props = {
    fields: [
      {name: 'name', type: 'text', label: 'Name', placeholder: 'Customer Name', options: {required: true}},
      {name: 'email', type: 'text', label: 'Email', placeholder: 'Customer Email', options: {required: true}},
    ],
    values: {
      name: 'Jane Doe',
      email: 'test@example.org'
    },
    success: false,
    errors: [],
    loading: options.loading || false,
    handleInputChange: expect.createSpy(), 
    handleFormSubmission: expect.createSpy()
  };

  const wrapper = shallow(<Form {...props} />);

  return {
    props,
    wrapper
  };
}

describe('Components', () => {
  describe('Form', () => {
    it('should render one form', () => {
      const { wrapper } = setup();
      const element = wrapper.find('form');

      expect(element.length).toBe(1);
    });

    it('should render one FormAlert', () => {
      const { wrapper } = setup();
      const element = wrapper.find('FormAlert');

      expect(element.length).toBe(1);
    });

    it('should render FormAlert props with success', () => {
      const { wrapper, props } = setup();
      const element = wrapper.find('FormAlert');

      expect(element.props().success).toBe(props.success);
    });

    it('should render FormAlert props with errors', () => {
      const { wrapper, props } = setup();
      const element = wrapper.find('FormAlert');

      expect(element.props().errors).toBe(props.errors);
    });

    it('should render a form-group for every field in fields', () => {
      const { wrapper, props } = setup();
      const element = wrapper.find('.form-group');

      expect(element.length).toBe(props.fields.length);
    });

    it('should render a label for every field in fields', () => {
      const { wrapper, props } = setup();
      const element = wrapper.find('label');

      expect(element.length).toBe(props.fields.length);
    });

    it('should render field.label as the text inside label', () => {
      const { wrapper, props } = setup();
      const element = wrapper.find('label');

      expect(element.first().text()).toBe(props.fields[0].label);
    });

    it('should render FormInput for every field in fields', () => {
      const { wrapper, props } = setup();
      const element = wrapper.find('FormInput');

      expect(element.length).toBe(props.fields.length);
    });

    it('should supply FormInput with props', () => {
      const { wrapper, props } = setup();
      const element = wrapper.find('FormInput');
      const firstElementProps = element.first().props();
      const firstFieldProps = props.fields[0];

      expect(firstElementProps.name).toEqual(firstFieldProps.name);
      expect(firstElementProps.value).toExist();
      expect(firstElementProps.type).toEqual(firstFieldProps.type);
      expect(firstElementProps.placeholder).toEqual(firstFieldProps.placeholder);
      expect(firstElementProps.options).toEqual(firstFieldProps.options);
      expect(firstElementProps.onChange).toExist();
    });

    it('should supply FormInput value with values[field.name]', () => {
      const { wrapper, props } = setup();
      const element = wrapper.find('FormInput');
      const firstElementProps = element.first().props();
      const firstFieldProps = props.fields[0];
      const fieldValue = props.values[firstFieldProps.name];

      expect(firstElementProps.value).toEqual(fieldValue);      
    });

    describe('when loading is true', () => {
      const { wrapper, props } = setup({loading: true});

      it('should render one Loading element', () => {
        const element = wrapper.find('Loading');
        expect(element.length).toBe(1);
      });

      it('should render zero input type submit', () => {
        const element = wrapper.find('input[type="submit"]');
        expect(element.length).toBe(0);
      });
    });

    describe('when loading is false', () => {
      const { wrapper, props } = setup({loading: false});

      it('should render zero Loading elements', () => {
        const element = wrapper.find('Loading');
        expect(element.length).toBe(0);
      });

      it('should render one input type submit', () => {
        const element = wrapper.find('input[type="submit"]');
        expect(element.length).toBe(1);
      });
    });
  });
});
