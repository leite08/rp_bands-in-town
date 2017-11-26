import React from 'react';
import {shallow} from 'enzyme';
jest.mock('../../imports/ui/Artists', () => 'artists')
import App from '../../client/src/app';


it('renders without crashing', () => {
  const component = shallow(<App />);
  expect(component).toBeDefined();
});
