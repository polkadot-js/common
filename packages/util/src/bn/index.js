// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const bnFromHex = require('./fromHex');
const bnToBn = require('./toBn');
const bnToHex = require('./toHex');
const bnToU8a = require('./toU8a');

/**
  @summary Utility methods to convert to and from `BN` objects
*/
module.exports = {
  bnFromHex,
  bnToBn,
  bnToHex,
  bnToU8a
};
