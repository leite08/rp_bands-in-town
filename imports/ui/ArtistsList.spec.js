import React from 'react';
import { shallow } from 'enzyme';

// jest.mock('meteor/react-meteor-data', () => 'a')
// jest.mock('../../imports/ui/Artists', () => 'artists')

import ArtistsList from './ArtistsList';

it('renders without crashing', () => {
  const component = shallow(<ArtistsList />);
  expect(component).toBeDefined();
});

it('should render loading', () => {
  const component = shallow(<ArtistsList loading="true" />);
  expect(component.find('span').text()).toEqual("Loading...");
});

