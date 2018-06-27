// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import xxhash64AsBn from './xxhash64/asBn';

/**
 * @name xxhashAsU8a
 * @signature xxhashAsU8a (data: Buffer | Uint8Array | string, bitLenght: number = 64): Uint8Array
 * @summary Creates a xxhash64 u8a from the input.
 * @description
 * From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a `Uint8Array` with the specified `bitLength`.
 * @example
 *   import { xxhashAsU8a } from '@polkadot/util-crypto';
 *
 *  xxhashAsU8a('abc') // => 0x44bc2cf5ad770999
 */
export default function xxhashAsU8a (data: Buffer | Uint8Array | string, bitLength: number = 64): Uint8Array {
  const byteLength = Math.ceil(bitLength / 8);
  const iterations = Math.ceil(bitLength / 64);
  const u8a = new Uint8Array(byteLength);

  for (let seed = 0; seed < iterations; seed++) {
    u8a.set(xxhash64AsBn(data, seed).toArray('le', 8), seed * 8);
  }

  return u8a;
}
