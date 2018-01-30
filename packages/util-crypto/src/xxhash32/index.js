// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const xxhash32AsBn = require('./asBn');
const xxhash32AsHex = require('./asHex');
const xxhash32AsRaw = require('./asRaw');

/**
  @summary Create [XXHash](http://cyan4973.github.io/xxHash/) values as BN, hex & number output
*/
module.exports = {
  xxhash32AsBn,
  xxhash32AsHex,
  xxhash32AsRaw
};
