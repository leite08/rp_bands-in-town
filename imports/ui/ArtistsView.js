import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-bootstrap';

// TODO finish presenting Artist's info
// TODO implement presenting Artist's Events info
const ArtistsView = ({ artist }) => {
  return (artist ?
      <div key={artist._id}>
        <h3>Information about {artist.name}</h3>
        <div><Image src={artist.thumb_url} responsive bsClass="thumb"/></div>
        <div>View more at <a href={artist.url} target="_blank">{artist.url}</a></div>
        <div>{artist.tracker_count}</div>
        <div>{artist.tracker_count}</div>
        <div>{artist.tracker_count}</div>
      </div>
      : <span></span>
  );
};

ArtistsView.propTypes = {
  artist: PropTypes.object
};

export default ArtistsView;