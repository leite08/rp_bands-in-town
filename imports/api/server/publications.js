import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { get } from './service';
import Artists from '../Artists';

let log4js = Npm.require('log4js');
let logger = log4js.getLogger('srv-bit-publs');

Meteor.publish('artists', function listArtists() {
  return Artists.find();
});

Meteor.publish('artist.view', function getArtist(artistName) {
  check(artistName, String);
  const self = this;
  try {
    const response = get(Meteor.settings.private.integration.artists, artistName);
    logger.debug('[artist view] response: '+JSON.stringify(response));
    if (response) {
      self.added('artists', response.id, response);
    }
    self.ready();
  } catch (error) {
    logger.error(error);
  }
});

