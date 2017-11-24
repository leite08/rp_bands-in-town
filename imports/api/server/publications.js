import { Meteor } from 'meteor/meteor';
import Artists from '../Artists';

let log4js = Npm.require('log4js');
let logger = log4js.getLogger('srv-bit-publs');

Meteor.publish('artists', function listArtists() {
  return Artists.find();
});
