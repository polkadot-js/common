// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { DecodeFunc, DecodeOutput } from './types';

import { assert } from '@polkadot/util';

export default function decodeString (decode: DecodeFunc, input: Uint8Array): DecodeOutput {
  const firstByte = input[0];
  const length = firstByte - 0x7f;
  let decoded;

  // set 0x80 null to 0
  if (firstByte === 0x80) {
    decoded = new Uint8Array([]);
  } else {
    decoded = input.slice(1, length);
  }

  assert(!(length === 2 && decoded[0] < 0x80), 'invalid rlp, byte must be less 0x80');

  return {
    decoded,
    remainder: input.slice(length)
  };
}
