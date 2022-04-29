import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import Intro from '../src/components/Intro';

configure({ adapter: new Adapter() });

describe('Testing Intro component - enzyme', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Intro count={2} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ count: 1 });
    expect(wrapper).toMatchSnapshot();
  });
});
