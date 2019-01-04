// Copyright 2017-2019 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import encodeArray from './array';
import toU8a from './toU8a';
import encodeU8a from './u8a';

/**
 * @name encoder
 * @signature encoder (input: any): Uint8Array
 * @summary Encodes the input value into RLP.
 * @description
 * From an input, calculate the RLP and return the result as a `Uint8Array`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { encode } from '@polkadot/util-rlp';
 *
 * encode('dog'); // => [0x83, 0x64, 0x6f, 0x67]
 * ```
 */
export default function encoder (input: any): Uint8Array {
  if (input instanceof Array) {
    return encodeArray(encoder, input);
  }

  return encodeU8a(encoder, toU8a(input));
}
