// Copyright 2017-2018 @polkadot/util-crypto authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const xxhash64AsBn = require('./asBn');
const xxhash64AsHex = require('./asHex');
const xxhash64AsRaw = require('./asRaw');

/**
  @summary Create [XXHash](http://cyan4973.github.io/xxHash/) values as BN, hex & number output
*/
module.exports = {
  xxhash64AsBn,
  xxhash64AsHex,
  xxhash64AsRaw
};
