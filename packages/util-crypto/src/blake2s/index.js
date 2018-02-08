// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const blake2sAsHex = require('./asHex');
const blake2sAsU8a = require('./asU8a');

/**
  @summary Create [Blake2s](https://blake2.net/) values as hex & Uint8Array output
*/
module.exports = {
  blake2sAsHex,
  blake2sAsU8a
};
