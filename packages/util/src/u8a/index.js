// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aConcat = require('./concat');
const u8aFixLength = require('./fixLength');
const u8aFromBn = require('./fromBn');
const u8aFromBuffer = require('./fromBuffer');
const u8aFromHex = require('./fromHex');
const u8aFromUtf8 = require('./fromUtf8');
const u8aFromString = require('./fromString');
const u8aToBn = require('./toBn');
const u8aToBuffer = require('./toBuffer');
const u8aToHex = require('./toHex');
const u8aToUtf8 = require('./toUtf8');

/**
  @summary Utility methods to convert to and from `Uint8Array` objects
*/
module.exports = {
  u8aConcat,
  u8aFixLength,
  u8aFromBn,
  u8aFromBuffer,
  u8aFromHex,
  u8aFromString,
  u8aFromUtf8,
  u8aToBn,
  u8aToBuffer,
  u8aToHex,
  u8aToUtf8
};
