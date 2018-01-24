// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const xxhashAsBn = require('./asBn');
const xxhashAsHex = require('./asHex');
const xxhashAsNumber = require('./asNumber');

/**
  @summary Create [XXHash](http://cyan4973.github.io/xxHash/) values as BN, hex & number output
*/
module.exports = {
  xxhashAsBn,
  xxhashAsHex,
  xxhashAsNumber
};
