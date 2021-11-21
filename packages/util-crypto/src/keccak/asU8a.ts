// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import js from 'js-sha3';

import { u8aToU8a } from '@polkadot/util';
import { keccak256, keccak512 } from '@polkadot/wasm-crypto';

import { createAsHex, createBitHasher, isWasmOnly } from '../helpers';

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
export function keccakAsU8a (value: HexString | Buffer | Uint8Array | string, bitLength: 256 | 512 = 256, onlyJs?: boolean): Uint8Array {
  const is256 = bitLength === 256;
  const u8a = u8aToU8a(value);

  return isWasmOnly(onlyJs)
    ? is256
      ? keccak256(u8a)
      : keccak512(u8a)
    : new Uint8Array(
      is256
        ? js.keccak256.update(u8a).arrayBuffer()
        : js.keccak512.update(u8a).arrayBuffer()
    );
}

/**
 * @name keccak256AsU8a
 * @description Creates a keccak256 Uint8Array from the input.
 */
export const keccak256AsU8a = createBitHasher(256, keccakAsU8a);

/**
 * @name keccak512AsU8a
 * @description Creates a keccak512 Uint8Array from the input.
 */
export const keccak512AsU8a = createBitHasher(512, keccakAsU8a);

/**
 * @name keccakAsHex
 * @description Creates a keccak hex string from the input.
 */
export const keccakAsHex = createAsHex(keccakAsU8a);
