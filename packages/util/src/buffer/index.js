// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const bufferFromHex = require('./fromHex');
const bufferFromNumber = require('./fromNumber');
const bufferFromU8a = require('./fromU8a');
const bufferToHex = require('./toHex');
const bufferToNumber = require('./toNumber');
const bufferToU8a = require('./toU8a');

/**
  @summary Utility methods to convert to and from `Buffer` objects
*/
module.exports = {
  bufferFromHex,
  bufferFromNumber,
  bufferFromU8a,
  bufferToHex,
  bufferToNumber,
  bufferToU8a
};
