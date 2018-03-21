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

function fromSingle (input: Uint8Array): ?DecodeOutput {
  // a single byte whose value is in the [0x00, 0x7f] range, that byte is its own RLP encoding
  if (input[0] <= 0x7f) {
    return decodeSingle(decode, input);
  }
}

function fromString (input: Uint8Array): ?DecodeOutput {
  // string is 0-55 bytes long. A single byte with value 0x80 plus the length of the string followed by the string
  // The range of the first byte is [0x80, 0xb7]
  if (input[0] <= 0xb7) {
    return decodeString(decode, input);
  }
}

function fromNumber (input: Uint8Array): ?DecodeOutput {
  // a number
  if (input[0] <= 0xbf) {
    return decodeNumber(decode, input);
  }
}

function fromShortList (input: Uint8Array): ?DecodeOutput {
  // a list between  0-55 bytes long
  if (input[0] <= 0xf7) {
    return decodeListShort(decode, input);
  }
}

function decode (input: Uint8Array): DecodeOutput {
  // NOTE: Order here is important
  return fromSingle(input) ||
    fromString(input) ||
    fromNumber(input) ||
    fromShortList(input) ||
    decodeListLong(decode, input);
}

module.exports = decode;
