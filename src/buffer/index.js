// ISC, Copyright 2017 Jaco Greeff
// @flow

const bufferFromHex = require('./fromHex');
const bufferToHex = require('./toHex');

/**
  @summary Utility methods to convert to and from `Buffer` objects
*/
module.exports = {
  bufferFromHex,
  bufferToHex
};
