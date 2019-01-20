import React from 'react';
import { shallow } from 'enzyme';
import { Button, ButtonGroup } from '@/components/ui';

describe('UI Component: <ButtonGroup />', () => {
  const wrapper = shallow(
    <ButtonGroup>
      <Button label="Group Test" styleType="primary" size="small" />
      <Button label="Group Test 2" styleType="primary" size="small" />
    </ButtonGroup>,
  );

  test('is rendered', () => {
    expect(wrapper.length).toEqual(1);
  });

  test('has expected number of children', () => {
    expect(wrapper.children().length).toEqual(2);
  });
});
