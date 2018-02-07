// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const blake2AsHex = require('./asHex');
const blake2AsHex128 = require('./asHex128');
const blake2AsHex256 = require('./asHex256');
const blake2AsHex512 = require('./asHex512');
const blake2AsU8a = require('./asU8a');
const blake2AsU8a128 = require('./asU8a128');
const blake2AsU8a256 = require('./asU8a256');
const blake2AsU8a512 = require('./asU8a512');

/**
  @summary Create blake2b values with specified bitlengths
*/
module.exports = {
  blake2AsHex,
  blake2AsHex128,
  blake2AsHex256,
  blake2AsHex512,
  blake2AsU8a,
  blake2AsU8a128,
  blake2AsU8a256,
  blake2AsU8a512
};
