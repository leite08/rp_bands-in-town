import React from 'react';
import { shallow } from 'enzyme';

// jest.mock('../../imports/ui/Artists', () => 'artists')

import ArtistsView from './ArtistsView';

it('renders without crashing', () => {
  const component = shallow(<ArtistsView />);
  expect(component).toBeDefined();
});

it('should not be rendered', () => {
  const component = shallow(<ArtistsView />);
  expect(component).toMatchSelector("span");
});

it('should render the events', () => {
  const artist = {
    _id: 1,
    events: [{id: 1, venue: {}, datetime: new Date()}, {id: 2, venue: {}, datetime: new Date()}]
  }
  const component = shallow(<ArtistsView artist={artist} />);
  expect(component.find('.event-container')).toHaveLength(artist.events.length);
});

