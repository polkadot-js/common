// Copyright 2017-2018 @polkadot/util-rlp authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DecodeFunc, DecodeOutput } from './types';

type Decoder = {
  max: number,
  fn: (decode: DecodeFunc, input: Uint8Array) => DecodeOutput
};

const decodeListLong = require('./listLong');
const decodeListShort = require('./listShort');
const decodeNumber = require('./number');
const decodeSingle = require('./single');
const decodeString = require('./string');

const decoders: Array<Decoder> = [
  { max: 0x7f, fn: decodeSingle },
  { max: 0xb7, fn: decodeString },
  { max: 0xbf, fn: decodeNumber },
  { max: 0xf7, fn: decodeListShort },
  { max: 0xff, fn: decodeListLong }
];

function decode (input: Uint8Array): DecodeOutput {
  return decoders
    .find(({ max }) => input[0] <= max)
    // $FlowFixMe last entry (listLong) is max uint8 value
    .fn(decode, input);
}

module.exports = decode;
