// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const encodeArray = require('./array');
const toU8a = require('./toU8a');
const encodeU8a = require('./u8a');

// flowlint-next-line unclear-type:off
function encoder (input: any): Uint8Array {
  if (input instanceof Array) {
    return encodeArray(encoder, input);
  }

  return encodeU8a(encoder, toU8a(input));
}

module.exports = encoder;
