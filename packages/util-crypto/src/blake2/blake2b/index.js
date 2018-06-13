// Copyright 2017-2018 @polkadot/util-crypto authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const blake2bAsHex = require('./asHex');
const blake2bAsU8a = require('./asU8a');

/**
  @summary Create [Blake2b](https://blake2.net/) values as hex & Uint8Array output
*/
module.exports = {
  blake2bAsHex,
  blake2bAsU8a
};
