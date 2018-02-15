// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const numberFromHex = require('./fromHex');
const numberToHex = require('./toHex');
const numberToU8a = require('./toU8a');

/**
  @summary Utility methods to convert to and from `number` values
*/
module.exports = {
  numberFromHex,
  numberToHex,
  numberToU8a
};
