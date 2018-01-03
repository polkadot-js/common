// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

const numberFromBuffer = require('./fromBuffer');
const numberFromHex = require('./fromHex');
const numberToBuffer = require('./toBuffer');
const numberToHex = require('./toHex');

/**
  @summary Utility methods to convert to and from `number` values
*/
module.exports = {
  numberFromBuffer,
  numberFromHex,
  numberToBuffer,
  numberToHex
};
