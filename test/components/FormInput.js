import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import FormInput from '../../src/components/FormInput';

function setup(options = {}) {
  const props = {
    name: 'name',
    value: 'John Doe',
    placeholder: 'Name',
    type: options.type || 'input',
    options: options.options,
    onChange: expect.createSpy()
  };

  const wrapper = shallow(<FormInput {...props} />);

  return {
    props,
    wrapper
  };
}

describe('Components', () => {
  describe('FormInput', () => {
    describe('when type is select', () => {
      const { wrapper, props } = setup({
        type: 'select',
        options: {
          choices: [
            'First Choice',
            'Second Choice'
          ]
        }
      });

      it('should render one select element', () => {
        const element = wrapper.find('select');

        expect(element.length).toBe(1);
      });

      it('should render two choices', () => {
        const element = wrapper.find('option');

        expect(element.length).toBe(2);
      });

      it('should render text in the choice element', () => {
        const element = wrapper.find('option').first();

        expect(element.text()).toBe('First Choice');
      });

      it('should render the default classname', () => {
        const element = wrapper.find('select');

        expect(element.hasClass('form-control')).toBe(true);
      });

      it('should render the passed in className', () => {
        const { wrapper } = setup({
          type: 'select',
          options: {
            choices: [
              'First Choice',
              'Second Choice'
            ],
            className: 'custom-class'
          }
        });
        const element = wrapper.find('select');

        expect(element.hasClass('custom-class')).toBe(true);
      });

      it('should trigger onChange', () => {
        const element = wrapper.find('select');
        element.props().onChange('test');
        expect(props.onChange.calls.length).toBe(1);
      });

      it('should supply select with props', () => {
        const element = wrapper.find('select');
        const elementProps = element.props();

        expect(elementProps.name).toEqual(props.name);
        expect(elementProps.value).toEqual(props.value);
        expect(elementProps.onChange).toEqual(props.onChange);
      });
    });

    describe('when type is textarea', () => {
      const { wrapper, props } = setup({
        type: 'textarea'
      });

      it('should render one textarea element', () => {
        const element = wrapper.find('textarea');

        expect(element.length).toBe(1);
      });

      it('should render the default classname', () => {
        const element = wrapper.find('textarea');

        expect(element.hasClass('form-control')).toBe(true);
      });

      it('should render the passed in className', () => {
        const { wrapper } = setup({
          type: 'textarea',
          options: {
            className: 'custom-class'
          }
        });
        const element = wrapper.find('textarea');

        expect(element.hasClass('custom-class')).toBe(true);
      });

      it('should set the textarea to required', () => {
        const { wrapper } = setup({
          type: 'textarea',
          options: {
            required: true
          }
        });
        const element = wrapper.find('textarea');

        expect(element.props().required).toBe(true);
      });

      it('should set the textarea defaults', () => {
        const { wrapper } = setup({
          type: 'textarea'
        });
        const element = wrapper.find('textarea');

        expect(element.props().rows).toBe(5);
      });

      it('should set the textarea rows', () => {
        const { wrapper } = setup({
          type: 'textarea',
          options: {
            rows: 20
          }
        });
        const element = wrapper.find('textarea');

        expect(element.props().rows).toBe(20);
      });

      it('should trigger onChange', () => {
        const element = wrapper.find('textarea');
        element.props().onChange('test');
        expect(props.onChange.calls.length).toBe(1);
      });

      it('should supply textarea with props', () => {
        const element = wrapper.find('textarea');
        const elementProps = element.props();

        expect(elementProps.name).toEqual(props.name);
        expect(elementProps.value).toEqual(props.value);
        expect(elementProps.placeholder).toEqual(props.placeholder);
        expect(elementProps.onChange).toEqual(props.onChange);
      });
    });

    describe('when type is anything else', () => {
      const { wrapper, props } = setup({type: 'text'});

      it('should render one input element', () => {
        const element = wrapper.find('input');

        expect(element.length).toBe(1);
      });

      it('should set the props type to type passed in', () => {
        const element = wrapper.find('input');

        expect(element.props().type).toBe('text');
      });

      it('should render the default classname', () => {
        const element = wrapper.find('input');

        expect(element.hasClass('form-control')).toBe(true);
      });

      it('should render the passed in className', () => {
        const { wrapper } = setup({
          options: {
            className: 'custom-class'
          }
        });
        const element = wrapper.find('input');

        expect(element.hasClass('custom-class')).toBe(true);
      });

      it('should set the input to required', () => {
        const { wrapper } = setup({
          options: {
            required: true
          }
        });
        const element = wrapper.find('input');

        expect(element.props().required).toBe(true);
      });

      it('should trigger onChange', () => {
        const element = wrapper.find('input');
        element.props().onChange('test');
        expect(props.onChange.calls.length).toBe(1);
      });

      it('should supply input with props', () => {
        const element = wrapper.find('input');
        const elementProps = element.props();

        expect(elementProps.name).toEqual(props.name);
        expect(elementProps.value).toEqual(props.value);
        expect(elementProps.placeholder).toEqual(props.placeholder);
        expect(elementProps.onChange).toEqual(props.onChange);
      });
    });
  });
});
