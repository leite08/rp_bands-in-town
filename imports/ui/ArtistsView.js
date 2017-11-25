import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';

const ArtistsView = ({ artist }) => {
  return (artist ?
      <div key={artist._id}>
        <h2>Information about {artist.name}</h2>
        <div><Image src={artist.thumb_url} responsive bsClass="thumb"/></div>
        <div>Facebook URL: <a href={artist.facebook_page_url} target="_blank">{artist.facebook_page_url}</a></div>
        <div>View more at <a href={artist.url} target="_blank">{artist.url}</a></div>
        <hr/>
        <h3>Events</h3>
        {artist.events ? artist.events.map((event) =>
          <div key={event.id}>
            <div><a href={event.url} target="_blank">{event.venue.name}</a></div>
            <div>Where: {event.venue.city}, {event.venue.country}</div>
            <div>When: {event.datetime}</div>
          </div>
        )
        : <span>No events.</span>
        }
        <hr/>
      </div>
      : <span></span>
  );
};

ArtistsView.propTypes = {
  artist: PropTypes.object
};

export default ArtistsView;