// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DecodeOutput } from './types';

const decodeListLong = require('./listLong');
const decodeListShort = require('./listShort');
const decodeNumber = require('./number');
const decodeSingle = require('./single');
const decodeString = require('./string');

function decode (input: Uint8Array): DecodeOutput {
  const firstByte = input[0];

  // a single byte whose value is in the [0x00, 0x7f] range, that byte is its own RLP encoding
  if (firstByte <= 0x7f) {
    return decodeSingle(decode, input);
  }

  // string is 0-55 bytes long. A single byte with value 0x80 plus the length of the string followed by the string
  // The range of the first byte is [0x80, 0xb7]
  if (firstByte <= 0xb7) {
    return decodeString(decode, input);
  }

  // a number
  if (firstByte <= 0xbf) {
    return decodeNumber(decode, input);
  }

  // a list between  0-55 bytes long
  if (firstByte <= 0xf7) {
    return decodeListShort(decode, input);
  }

  // a list  over 55 bytes long
  return decodeListLong(decode, input);
}

module.exports = decode;
