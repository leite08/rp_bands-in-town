import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-bootstrap';

// TODO finish presenting Artist's info
// TODO implement presenting Artist's Events info
const ArtistsView = ({ artist }) => {
  return (artist ?
      <div key={artist._id}>
        <h2>Information about {artist.name}</h2>
        <div><Image src={artist.thumb_url} responsive bsClass="thumb"/></div>
        <div>View more at <a href={artist.url} target="_blank">{artist.url}</a></div>
        <div># of trackers: {artist.tracker_count}</div>
        <hr/>
        <h3>Events</h3>
        {artist.events ? artist.events.map((event) =>
          <div>
            <div><a href={event.url} target="_blank">{event.venue.name}</a></div>
          </div>
        )
        : <span>No events.</span>
        }
      </div>
      : <span></span>
  );
};

ArtistsView.propTypes = {
  artist: PropTypes.object
};

export default ArtistsView;