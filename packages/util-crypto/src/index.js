// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const blake2 = require('./blake2');
const kdf = require('./kdf');
const keccak = require('./keccak');
const nacl = require('./nacl');
const random = require('./random');
const sha512 = require('./sha512');
const xxhash = require('./xxhash');

/**
  @summary Utility methods for this package are split into groups
*/
module.exports = Object.assign(
  {}, blake2, kdf, keccak, nacl, random, sha512, xxhash
);
