import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Input } from '@/components/ui';
import { Search, Delete } from 'react-feather';

describe('UI Component: <Input />', () => {
  const onChangeSpy = sinon.spy();
  const iconLeftClass = 'stroke-current text-lgray';
  const iconRightClass = 'stroke-current text-black';
  const wrapper = shallow(
    <Input
      type="text"
      extraClassName="w-6/12 mt-4 rounded-lg"
      placeholder="Search for existing communities, type in your keyword"
      onChange={onChangeSpy}
      label="label text"
      helpText="help text"
      errorText="error text"
      value="initial value"
      initialValue="initial value"
      iconLeft={<Search className={iconLeftClass} />}
      iconRight={<Delete className={iconRightClass} />}
      id="input-id"
    />,
  );

  const input = wrapper.find('input');

  test('sets initial value if provided', () => {
    expect(input.props().defaultValue).toBe('initial value');
  });

  test('renders Input', () => {
    expect(input.length).toEqual(1);
  });

  test('renders label', () => {
    const label = wrapper.find('.label');
    expect(wrapper.state('value')).toBe('initial value');
    expect(label.text()).toEqual('label text');
  });

  test('renders help text', () => {
    const helpText = wrapper.find('.help-text');
    expect(helpText.text()).toEqual('help text');
  });

  test('renders error text', () => {
    const errorText = wrapper.find('.error-text');
    expect(errorText.text()).toEqual('error text');
  });

  test('renders Input with text type when no type provided', () => {
    wrapper.setProps({ type: undefined });
    expect(input.props().type).toEqual('text');
  });

  test('onChangeHandler and onChange prop is called when input changed', () => {
    const newValue = 'Your new Value';
    const args = { target: { value: newValue } };
    input.simulate('change', args);
    expect(onChangeSpy.args[0][0]).toEqual(args);
    expect(wrapper.state('value')).toBe(newValue);
  });

  test('renders given Left Icon correctly', () => {
    expect(
      wrapper
        .find('.icon-left')
        .childAt(0)
        .hasClass(iconLeftClass),
    ).toBe(true);
  });

  test('renders given Right Icon correctly', () => {
    expect(
      wrapper
        .find('.icon-right')
        .childAt(0)
        .hasClass(iconRightClass),
    ).toBe(true);
  });
});
