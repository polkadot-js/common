// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.
// @flow

import type { DecodeFunc, DecodeOutput } from './types';

import decodeListLong from './listLong';
import decodeListShort from './listShort';
import decodeNumber from './number';
import decodeSingle from './single';
import decodeString from './string';

type Decoder = {
  max: number,
  fn: (decode: DecodeFunc, input: Uint8Array) => DecodeOutput
};

const decoders: Array<Decoder> = [
  { max: 0x7f, fn: decodeSingle },
  { max: 0xb7, fn: decodeString },
  { max: 0xbf, fn: decodeNumber },
  { max: 0xf7, fn: decodeListShort },
  { max: 0xff, fn: decodeListLong }
];

export default function decode (input: Uint8Array): DecodeOutput {
  return decoders
    .find(({ max }) => input[0] <= max)
    // $FlowFixMe last entry (listLong) is max uint8 value
    .fn(decode, input);
}
