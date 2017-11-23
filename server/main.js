import { Meteor } from 'meteor/meteor';

let log4js = Npm.require('log4js'); // From: https://log4js-node.github.io/log4js-node/index.html
// Initial configuration
log4js.configure(Meteor.settings.private.log);

let logger = log4js.getLogger('srv-main');

function start() {
  logger.info(`Starting on environment '${process.env.NODE_ENV}'`);
}

Meteor.startup(() => {
  start();
});
