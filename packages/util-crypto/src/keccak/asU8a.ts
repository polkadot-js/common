// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { keccak_256 as keccak256Js, keccak_512 as keccak512Js } from '@noble/hashes/lib/sha3';

import { assert, hasBigInt, u8aToU8a } from '@polkadot/util';
import { isReady, keccak256 } from '@polkadot/wasm-crypto';

/**
 * @name keccakAsU8a
 * @summary Creates a keccak Uint8Array from the input.
 * @description
 * From either a `string` or a `Buffer` input, create the keccak and return the result as a `Uint8Array`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { keccakAsU8a } from '@polkadot/util-crypto';
 *
 * keccakAsU8a('123'); // => Uint8Array
 * ```
 */
export function keccakAsU8a (value: HexString | Buffer | Uint8Array | string, bitLength: 256 | 512 = 256, onlyJs = false): Uint8Array {
  const is256 = bitLength === 256;

  assert(hasBigInt || is256, 'BigInt is required for keccak512 operations');

  return !hasBigInt || (isReady() && is256 && !onlyJs)
    ? keccak256(u8aToU8a(value))
    : is256
      ? keccak256Js(u8aToU8a(value))
      : keccak512Js(u8aToU8a(value));
}
