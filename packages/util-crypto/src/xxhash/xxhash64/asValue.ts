// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import xxhashjs from 'xxhashjs';
import { isBuffer, isString, u8aToBuffer } from '@polkadot/util/index';

/**
 * @name xxhash64AsValue
 * @signature xxhash64AsValue (data: Buffer | Uint8Array | string, seed: number): number
 * @summary Creates a hex number from the input.
 * @description
 * From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a hex number
 * @example
 * <BR>
 *
 * ```javascript
 * import { xxhash64AsValue } from '@polkadot/util-crypto';
 *
 * xxhash64AsValue('abcd', 0xabcd)); // => e29f70f8b8c96df7
 * ```
 */
export default function xxhash64AsValue (data: Buffer | Uint8Array | string, seed: number): number {
  if (isBuffer(data) || isString(data)) {
    // @ts-ignore Buffer is ArrayBuffer underlying
    return xxhashjs.h64(data, seed);
  }

  return xxhashjs.h64(
    // @ts-ignore conversion works, yields correct result
    u8aToBuffer(data),
    seed
  );
}
