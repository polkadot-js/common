// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const toU8a = require('../util/toU8a');

const encodeArray = require('./array');
const encodeU8a = require('./u8a');

// Adapted from https://github.com/ethereumjs/rlp/blob/0ce09db81fc303fcee593f7cc094ba44015f9b92/index.js#L9
// flowlint-next-line unclear-type:off
function rlpEncode (input: any): Uint8Array {
  if (input instanceof Array) {
    return encodeArray(rlpEncode, input);
  }

  return encodeU8a(rlpEncode, toU8a(input));
}

module.exports = rlpEncode;
