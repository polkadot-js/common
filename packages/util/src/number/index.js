// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const numberFromBuffer = require('./fromBuffer');
const numberFromHex = require('./fromHex');
const numberToBuffer = require('./toBuffer');
const numberToHex = require('./toHex');
const numberToU8a = require('./toU8a');

/**
  @summary Utility methods to convert to and from `number` values
*/
module.exports = {
  numberFromBuffer,
  numberFromHex,
  numberToBuffer,
  numberToHex,
  numberToU8a
};
