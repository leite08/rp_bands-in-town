import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Image} from 'react-bootstrap';
import Artists from '../api/Artists';
import './ArtistsList.css';

// TODO paginate
const ArtistsList = ({ loading, artists }) => (!loading ?
  <div className="table-wrapper">
    <table className="alt">
      <thead>
      <tr>
        <th/>
        <th>Name</th>
        <th># Trackers</th>
      </tr>
      </thead>
      <tbody>
      {(artists && artists.length > 0) ? artists.map((artist) =>
          <tr key={artist._id}>
            <td className="thumb"><img src={artist.thumb_url} /></td>
            <td><a href={artist.url} target="_blank">{artist.name}</a></td>
            <td>{artist.tracker_count}</td>
          </tr>
        )
        : <tr>
          <td colSpan={3}><span>No artists to show</span></td>
        </tr>
      }
      </tbody>
    </table>
  </div>
  : <span>Loading...</span>
);

export default withTracker(() => {
  const subscription = Meteor.subscribe('artists');
  return {
    loading: !subscription.ready(),
    artists: Artists.find().fetch(),
  };
})(ArtistsList);
