import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ArtistsSearch from '../../imports/ui/ArtistsSearch';
import ArtistsView from '../../imports/ui/ArtistsView';
import ArtistsList from '../../imports/ui/ArtistsList';
import { ReactiveVar } from 'meteor/reactive-var';

const artistReactVar = new ReactiveVar();
const showListVar = new ReactiveVar(false);

class Artists extends Component {

  onResult = (error, artist) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      if (!artist) {
        Bert.alert('Didn\'t find any artist with the given name', 'info');
      } else {
        artistReactVar.set(artist);
      }
    }
  };

  onInitSearch = (artistName) => {
    artistReactVar.set();
  };

  showList = () => { showListVar.set(true); };
  hideList = () => { showListVar.set(false); };

  render() {
    const { artist, showList } = this.props;
    return (
      <div>
        <div><span>
          Would you like to know when your favourite artist will play? Use the search below to find out:
        </span></div>
        <ArtistsSearch onInitSearch={this.onInitSearch} onResult={this.onResult} />
        <ArtistsView artist={artist} />
        {/* extra stuff */}
        {showList ?
          <div>
            <a onClick={this.hideList}>Hide the list</a>
            <h2>Artists on local database</h2>
            <ArtistsList />
          </div>
          :
          <p>
            <a onClick={this.showList}>Show me everything you have on cache... :)</a>
          </p>
        }
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    artist: artistReactVar.get(),
    showList: showListVar.get()
  };
})(Artists);
