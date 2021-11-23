// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { hasBigInt, u8aToU8a } from '@polkadot/util';
import { isReady, twox } from '@polkadot/wasm-crypto';

import { createAsHex } from '../helpers';
import { xxhash64 } from './xxhash64';

type BitLength = 64 | 128 | 192 | 256 | 320 | 384 | 448 | 512;

/**
 * @name xxhashAsU8a
 * @summary Creates a xxhash64 u8a from the input.
 * @description
 * From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a `Uint8Array` with the specified `bitLength`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { xxhashAsU8a } from '@polkadot/util-crypto';
 *
 * xxhashAsU8a('abc'); // => 0x44bc2cf5ad770999
 * ```
 */
export function xxhashAsU8a (data: HexString | Buffer | Uint8Array | string, bitLength: BitLength = 64, onlyJs?: boolean): Uint8Array {
  const rounds = Math.ceil(bitLength / 64);
  const u8a = u8aToU8a(data);

  if (!hasBigInt || (!onlyJs && isReady())) {
    return twox(u8a, rounds);
  }

  const result = new Uint8Array(rounds * 8);

  for (let seed = 0; seed < rounds; seed++) {
    result.set(xxhash64(u8a, seed).reverse(), seed * 8);
  }

  return result;
}

/**
 * @name xxhashAsHex
 * @description Creates a xxhash64 hex from the input.
 */
export const xxhashAsHex = createAsHex(xxhashAsU8a);
