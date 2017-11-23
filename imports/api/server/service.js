import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

let Future = Npm.require("fibers/future");
let log4js = Npm.require('log4js');
let logger = log4js.getLogger('srv-bit-intgr');

const baseUrl = `${Meteor.settings.private.integration.baseUrl}`;
const artistUri = `${Meteor.settings.private.integration.artists}`;
const auth = `${Meteor.settings.private.integration.authTokenParam}=${Meteor.settings.private.integration.authToken}`;

export const get = (name) => {
  logger.trace(`[intgr.get] starting, name: ${name}`);
  try {
    const url = `${baseUrl}${artistUri}/${name}?${auth}`;
    logger.trace(`[intgr.get] url: ${url}`);
    const response = HTTP.get(url);
    logger.trace('[intgr.get] response.json: '+JSON.stringify(response.data));
    if (response.data) {
      return response.data;
    }
    return undefined;

  } catch (exception) {
    logger.error(exception);
    throw new Meteor.Error('500', exception);
  } finally {
    logger.trace('[intgr.get] leaving');
  }
};
