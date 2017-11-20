// ISC, Copyright 2017 Jaco Greeff
// @flow

const bnFromHex = require('./fromHex');
const bnToHex = require('./toHex');

/**
  @summary Utility methods to convert to and from `BN` objects
*/
module.exports = {
  bnFromHex,
  bnToHex
};
