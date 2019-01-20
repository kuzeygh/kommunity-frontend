import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { RadioButton, RadioButtonGroup } from '@/components/ui';

describe('UI Component: <RadioButtonGroup />', () => {
  const onChangeSpy = sinon.spy();
  const groupProps = {
    name: 'grpOne',
    onChange: onChangeSpy,
    size: 'small',
  };
  const props = index => ({
    label: `label-${index}`,
    value: index.toString(),
  });
  const wrapper = shallow(
    <RadioButtonGroup {...groupProps}>
      <RadioButton {...props(0)} />
      <RadioButton {...props(1)} />
      <RadioButton {...props(2)} />
    </RadioButtonGroup>,
  );
  test('is rendered', () => {
    expect(wrapper.length).toEqual(1);
  });
  test('has expected number of children', () => {
    expect(wrapper.children().length).toEqual(3);
  });
});
