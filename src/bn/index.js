// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
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
