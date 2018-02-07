// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const xxhashAsHex = require('./asHex');
const xxhashAsHex128 = require('./asHex128');
const xxhashAsHex256 = require('./asHex256');
const xxhashAsU8a = require('./asU8a');
const xxhashAsU8a128 = require('./asU8a128');
const xxhashAsU8a256 = require('./asU8a256');

/**
  @summary Create xxhash64 values with specified bitlengths
*/
module.exports = {
  xxhashAsHex,
  xxhashAsHex128,
  xxhashAsHex256,
  xxhashAsU8a,
  xxhashAsU8a128,
  xxhashAsU8a256
};
