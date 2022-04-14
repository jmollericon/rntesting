import React from 'react';
import renderer from 'react-test-renderer';
import Intro from './../src/components/Intro';

test('Renders correctly, Intro component', () => {
  const tree = renderer.create(<Intro />).toJSON();
  expect(tree).toMatchSnapshot();
});
