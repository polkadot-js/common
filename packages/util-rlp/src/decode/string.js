// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DecodeFunc, DecodeOutput } from './types';

module.exports = function decodeString (decode: DecodeFunc, input: Uint8Array): DecodeOutput {
  const firstByte = input[0];
  const length = firstByte - 0x7f;
  let decoded;

  // set 0x80 null to 0
  if (firstByte === 0x80) {
    decoded = new Uint8Array([]);
  } else {
    decoded = input.slice(1, length);
  }

  if (length === 2 && decoded[0] < 0x80) {
    throw new Error('invalid rlp encoding: byte must be less 0x80');
  }

  return {
    decoded,
    remainder: input.slice(length)
  };
};
