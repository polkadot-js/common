// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import js from 'js-sha3';

import { u8aToU8a } from '@polkadot/util';
import { isReady, keccak256, keccak512 } from '@polkadot/wasm-crypto';

type HashFn = (value: HexString | Buffer | Uint8Array | string, onlyJs?: boolean) => Uint8Array;

function createKeccak (bitLength: 256 | 512 = 256): HashFn {
  return (value: HexString | Buffer | Uint8Array | string, onlyJs?: boolean): Uint8Array =>
    keccakAsU8a(value, bitLength, onlyJs);
}

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

  return isReady() && !onlyJs
    ? is256
      ? keccak256(u8a)
      : keccak512(u8a)
    : new Uint8Array(
      is256
        ? js.keccak256.update(u8a).arrayBuffer()
        : js.keccak512.update(u8a).arrayBuffer()
    );
}

export const keccak256AsU8a = createKeccak(256);
export const keccak512AsU8a = createKeccak(512);
