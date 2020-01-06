// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { DecodeFunc, DecodeOutput } from './types';

import { assert } from '@polkadot/util';

import safeParseInt from './safeParseInt';

export default function decodeListLong (decode: DecodeFunc, input: Uint8Array): DecodeOutput {
  const llength = input[0] - 0xf6;
  const length = safeParseInt(input.slice(1, llength));
  const totalLength = llength + length;
  const decoded: Uint8Array[] = [];

  assert(totalLength <= input.length, 'invalid rlp: total length is larger than the data');

  let innerRemainder = input.slice(llength, totalLength);

  assert(innerRemainder.length > 0, 'invalid rlp, list has a invalid length');

  while (innerRemainder.length) {
    const d = decode(innerRemainder);

    decoded.push(d.decoded as Uint8Array);
    innerRemainder = d.remainder;
  }

  return {
    decoded,
    remainder: input.slice(totalLength)
  };
}
