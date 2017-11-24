import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

// let Future = Npm.require("fibers/future");
let log4js = Npm.require('log4js');
let logger = log4js.getLogger('srv-bit-intgr');

const baseUrl = `${Meteor.settings.private.integration.baseUrl}`;
const artistUri = `${Meteor.settings.private.integration.artists}`;
const eventsUri = `${Meteor.settings.private.integration.events}`;
const auth = `${Meteor.settings.private.integration.authTokenParam}=${Meteor.settings.private.integration.authToken}`;

export const getArtistFromApi = (name) => {
  logger.trace(`[getArtistFromApi] starting, name: ${name}`);
  try {
    const url = `${baseUrl}${artistUri}/${name}?${auth}`;
    return getFromApi(url);
  } finally {
    logger.trace('[getArtistFromApi] leaving');
  }
};

export const getEventsFromApi = (name) => {
  logger.trace(`[getEventsFromApi] starting, name: ${name}`);
  try {
    const url = `${baseUrl}${artistUri}/${name}${eventsUri}?${auth}`;
    return getFromApi(url);
  } finally {
    logger.trace('[getEventsFromApi] leaving');
  }
};

const getFromApi = (url) => {
  logger.trace(`[getFromApi] starting, url: ${url}`);
  try {
    const response = HTTP.get(url);
    logger.trace('[getFromApi] response.json: '+JSON.stringify(response.data));
    if (response.data) {
      return response.data;
    }
    return undefined;

  } catch (exception) {
    logger.error(exception);
    throw new Meteor.Error('500', exception);
  } finally {
    logger.trace('[getFromApi] leaving');
  }
};
