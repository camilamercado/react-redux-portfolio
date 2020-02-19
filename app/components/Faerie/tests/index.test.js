import React from 'react';
import { shallow } from 'enzyme';

import Faerie from '../index';

describe('<Faerie />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(<Faerie />);
    expect(
      renderedComponent.contains(
        <section>This project is licensed under the MIT license.</section>
      )
    ).toBe(true);
  });

  it('should render the credits', () => {
    const renderedComponent = shallow(<Faerie />);
    expect(renderedComponent.text()).toContain('Dinesh Pandiyan');
  });
});
