// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { DecodeFunc, DecodeOutput } from './types';

export default function decodeListShort (decode: DecodeFunc, input: Uint8Array): DecodeOutput {
  const decoded: Array<any | Uint8Array> = [];
  const length = input[0] - 0xbf;
  let innerRemainder = input.slice(1, length);

  while (innerRemainder.length) {
    const d = decode(innerRemainder);

    decoded.push(d.decoded);
    innerRemainder = d.remainder;
  }

  return {
    decoded,
    remainder: input.slice(length)
  };
}
