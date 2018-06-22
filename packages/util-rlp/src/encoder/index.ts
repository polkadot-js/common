// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import encodeArray from './array';
import toU8a from './toU8a';
import encodeU8a from './u8a';

export default function encoder (input: any): Uint8Array {
  if (input instanceof Array) {
    return encodeArray(encoder, input);
  }

  return encodeU8a(encoder, toU8a(input));
}
