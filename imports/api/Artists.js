import { Mongo } from 'meteor/mongo';

const Artists = new Mongo.Collection('artists');
export default Artists;