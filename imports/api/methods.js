import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import rateLimit from '../modules/rate-limit';
import { getArtistFromApi, getEventsFromApi } from './server/service';
import Artists from './Artists';
import Events from './Events';

let log4js = Npm.require('log4js');
let logger = log4js.getLogger('srv-bit-methods');

// TODO limit the number of documents on the collection/DB (each call vs. timer?)
Meteor.methods({
  artistSearch(artistName) {
    logger.trace('[artistSearch] starting... artistName: '+artistName);
    check(artistName, String);
    try {
      // First look for the artist on the local database
      // TODO mind indexes for performance
      let artistLocal = Artists.findOne({'name':{
        $regex : new RegExp(artistName, "i") }}); // case insentitive
      if (!artistLocal) {

        // If not found, then call the API to get the artist
        const artist = getArtistFromApi(artistName);
        if (!artist) {
          return; // didn't find it
        }
        // Save the artist on the local database
        const _id = Artists.insert(artist);
        artistLocal = Artists.findOne(_id);

        // retrieve the artist's events
        const events = getEventsFromApi(artistName);
        // save the events on its own collection
        _.each(events, (event) => {
          Events.insert(event);
        });
        artistLocal.events = events;

      } else {
        // load the events
        const eventsLocal = Events.find({'artist_id':artistLocal.id});
        // TODO check if there are updates on the artist's events
        artistLocal.events = eventsLocal.fetch();
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
