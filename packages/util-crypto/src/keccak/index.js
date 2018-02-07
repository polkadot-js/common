// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const keccakAsBuffer = require('./asBuffer');
const keccakAsHex = require('./asHex');
const keccakAsString = require('./asString');
const keccakAsU8a = require('./asU8a');

/**
  @summary Create Keccak256 values as hex, string, Buffer & Uint8Array output
*/
module.exports = {
  keccakAsBuffer,
  keccakAsHex,
  keccakAsString,
  keccakAsU8a
};
