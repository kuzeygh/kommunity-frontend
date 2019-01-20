import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Popup from '@/components/ui/popup';

describe('UI Component: <Popup />', () => {
  const onClickSpy = sinon.spy();
  const wrapper = shallow(
    <Popup show onClose={onClickSpy}>
      <p>Hello World!</p>
    </Popup>,
  );
  const Icon = wrapper.find('.absolute');
  test('has overlay', () => {
    expect(
      wrapper
        .find('div')
        .at(0)
        .hasClass('opacity-70'),
    ).toEqual(true);
  });
  test('onClick is called when clicked', () => {
    Icon.simulate('click');
    expect(onClickSpy.callCount).toEqual(1);
  });
});
