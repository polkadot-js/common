// ISC, Copyright 2017 Jaco Greeff
// @flow

const hexAddPrefix = require('./addPrefix');
const hexFromBn = require('./fromBn');
const hexHasPrefix = require('./hasPrefix');
const hexStripPrefix = require('./stripPrefix');
const hexToBn = require('./toBn');

/**
  @summary Internal utilities to create and test for hex values
*/
module.exports = {
  hexAddPrefix,
  hexFromBn,
  hexHasPrefix,
  hexStripPrefix,
  hexToBn
};
