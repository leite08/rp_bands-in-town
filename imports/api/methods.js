import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import rateLimit from '../modules/rate-limit';
import { getArtistFromApi, getEventsFromApi } from './server/service';
import Artists from './Artists';
import Events from './Events';

let log4js = Npm.require('log4js');
let logger = log4js.getLogger('srv-bit-methods');

const getArtistByName = (name) => {
  return Artists.findOne({'nameLower':name.toLowerCase()});
};

const saveEvents = (events) => {
  events.forEach((event) => {
    Events.insert(event);
  });
};

const saveArtistOnLocalDb = (artist) => {
  artist.nameLower = artist.name.toLowerCase();
  const _id = Artists.insert(artist);
  const artistLocal = Artists.findOne(_id);
  // retrieve the artist's events
  const events = getEventsFromApi(artist.name);
  // save the events on its own collection
  saveEvents(events);
  artistLocal.events = events;
  return artistLocal;
};

// TODO limit the number of documents on the collection/DB (each call vs. timer?)
Meteor.methods({
  artistSearch(artistName) {
    logger.trace('[artistSearch] starting... artistName: '+artistName);
    check(artistName, String);
    try {
      // First look for the artist on the local database
      // TODO mind indexes for performance
      let foundLocal = true;
      let artistLocal = getArtistByName(artistName);
      if (!artistLocal) {
        // If not found, then call the API to get the artist
        const artist = getArtistFromApi(artistName);
        if (!artist) {
          return; // didn't find it on the API
        }
        // Before saving on the database, check the name again,
        // the service might have returned an artist with similar name
        artistLocal = getArtistByName(artist.name);
        if (!artistLocal) {
          foundLocal = false;
          // Save the artist on the local database
          artistLocal = saveArtistOnLocalDb(artist);
        }
      }
      if (foundLocal) {
        // load the events
        artistLocal.events = Events.find({'artist_id':artistLocal.id}).fetch();
        // TODO check if there are updates on the artist's events and send a reactive update to the client
      }
      return artistLocal;

    } catch (exception) {
      logger.error(exception);
      throw new Meteor.Error('500', exception);
    } finally {
      logger.trace('[artistSearch] leaving');
    }
  },
});

rateLimit({
  methods: [
    'artistSearch',
  ],
  limit: 5,
  timeRange: 1000,
});
