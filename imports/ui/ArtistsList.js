import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import {Table, Image} from 'react-bootstrap';
import Artists from '../api/Artists';

// TODO paginate
const ArtistsList = ({ loading, artists }) => (!loading ?
  <Table responsive>
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
          <td><Image src={artist.thumb_url} responsive bsClass="thumb"/></td>
          <td><a href={artist.url} target="_blank">{artist.name}</a></td>
          <td>{artist.tracker_count}</td>
        </tr>
      )
      : <tr>
        <td colSpan={3}><span>No artists to show</span></td>
      </tr>
    }
    </tbody>
  </Table>
  : <span>Loading...</span>
);

export default withTracker(() => {
  const subscription = Meteor.subscribe('artists');
  return {
    loading: !subscription.ready(),
    artists: Artists.find().fetch(),
  };
})(ArtistsList);
