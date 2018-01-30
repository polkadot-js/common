// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const blake2s = require('./blake2s');
const blake2b = require('./blake2b');
const keccak = require('./keccak');
const nacl = require('./nacl');
const random = require('./random');
const sha512 = require('./sha512');
const xxhash32 = require('./xxhash32');
const xxhash64 = require('./xxhash64');

/**
  @summary Utility methods for this package are split into groups
*/
module.exports = Object.assign(
  {}, blake2b, blake2s, keccak, nacl, random, sha512, xxhash32, xxhash64
);
