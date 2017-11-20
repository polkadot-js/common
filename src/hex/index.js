// ISC, Copyright 2017 Jaco Greeff
// @flow

const hexAddPrefix = require('./addPrefix');
const hexHasPrefix = require('./hasPrefix');
const hexStripPrefix = require('./stripPrefix');

/**
  @summary Internal utilities to create and test for hex values
*/
module.exports = {
  hexAddPrefix,
  hexHasPrefix,
  hexStripPrefix
};
