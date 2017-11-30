// ISC, Copyright 2017 Jaco Greeff
// @flow

const hexAddPrefix = require('./addPrefix');
const hexFromBn = require('./fromBn');
const hexFromBuffer = require('./fromBuffer');
const hexFromNumber = require('./fromNumber');
const hexHasPrefix = require('./hasPrefix');
const hexStripPrefix = require('./stripPrefix');
const hexToBn = require('./toBn');
const hexToBuffer = require('./toBuffer');
const hexToNumber = require('./toNumber');

/**
  @summary Internal utilities to create and test for hex values
*/
module.exports = {
  hexAddPrefix,
  hexFromBn,
  hexFromBuffer,
  hexFromNumber,
  hexHasPrefix,
  hexStripPrefix,
  hexToBn,
  hexToBuffer,
  hexToNumber
};
