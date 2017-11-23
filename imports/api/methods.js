import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import rateLimit from '../modules/rate-limit';
import { get } from './server/service';
import Artists from './Artists';

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
        const artist = get(artistName);
        if (!artist) {
          return; // didn't find it
        }
        // TODO retrieve the artist's events
        // Save them locally
        const _id = Artists.insert(artist);
        // TODO save the events on its own collection
        artistLocal = Artists.findOne(_id);
      } else {
        // TODO load the events
      }
      // TODO create wrapper to artist + array of events
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
