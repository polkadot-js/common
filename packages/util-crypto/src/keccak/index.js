// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const keccakAsBuffer = require('./asBuffer');
const keccakAsHex = require('./asHex');
const keccakAsString = require('./asString');

/**
  @summary Create Keccak256 values as hex, string & buffer output
*/
module.exports = {
  keccakAsBuffer,
  keccakAsHex,
  keccakAsString
};
