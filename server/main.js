import { Meteor } from 'meteor/meteor';
import '../imports/api/api';

let log4js = Npm.require('log4js'); // From: https://log4js-node.github.io/log4js-node/index.html
log4js.configure(Meteor.settings.private.log); // Initial configuration, only this once
let logger = log4js.getLogger('srv-main');

function start() {
  logger.info(`Starting on environment '${process.env.NODE_ENV}'`);
}

Meteor.startup(() => {
  start();
});
