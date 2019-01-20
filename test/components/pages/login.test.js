import React from 'react';
import MemoryRouter from 'react-router-dom/MemoryRouter';

import { shallow } from 'enzyme';
import LoginForm from '@/components/pages/login';

describe('Components: <Login />', () => {
  test('renders without exploding', () => {
    const wrapper = shallow(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>,
    );
    expect(wrapper.html()).toContain('div');
  });
});
