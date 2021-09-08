// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import js from 'blakejs';

import { u8aToU8a } from '@polkadot/util';
import { blake2b, isReady } from '@polkadot/wasm-crypto';

/**
 * @name blake2AsU8a
 * @summary Creates a blake2b u8a from the input.
 * @description
 * From a `Uint8Array` input, create the blake2b and return the result as a u8a with the specified `bitLength`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { blake2AsU8a } from '@polkadot/util-crypto';
 *
 * blake2AsU8a('abc'); // => [0xba, 0x80, 0xa53, 0xf98, 0x1c, 0x4d, 0x0d]
 * ```
 */
export function blake2AsU8a (data: HexString | Uint8Array | string, bitLength = 256, key?: Uint8Array | null, onlyJs = false): Uint8Array {
  const byteLength = Math.ceil(bitLength / 8);

  return isReady() && !onlyJs
    ? blake2b(u8aToU8a(data), u8aToU8a(key), byteLength)
    : js.blake2b(u8aToU8a(data), key || undefined, byteLength);
}
