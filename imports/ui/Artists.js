import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ArtistsSearch from '../../imports/ui/ArtistsSearch';
import ArtistsView from '../../imports/ui/ArtistsView';
import ArtistsList from '../../imports/ui/ArtistsList';
import { ReactiveVar } from 'meteor/reactive-var';

const artistReactVar = new ReactiveVar();

class Artists extends Component {
  onResult = (error, artist) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      if (!artist) {
        Bert.alert('Didn\'t find any artist with the given name', 'info');
      } else {
        Bert.alert('Found', 'success');
        artistReactVar.set(artist);
      }
    }
  };

  render() {
    const {artists} = this.props;
    return (
      <div>
        <ArtistsSearch onResult={this.onResult} />
        <ArtistsView artist={artists} />
        <h2>List of Artists</h2>
        <ArtistsList /> {/* TODO optional */}
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    artists: artistReactVar.get()
  };
})(Artists);
