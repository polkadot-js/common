// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '@polkadot/util';

import { blake2AsU8a } from './asU8a';

/**
 * @name blake2AsHex
 * @summary Creates a blake2b hex from the input.
 * @description
 * From a `Uint8Array` input, create the blake2b and return the result as a hex string with the specified `bitLength`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { blake2AsHex } from '@polkadot/util-crypto';
 *
 * blake2AsHex('abc'); // => 0xba80a53f981c4d0d
 * ```
 */
export function blake2AsHex (data: Uint8Array | string, bitLength = 256, key?: Uint8Array | null, onlyJs = false): string {
  return u8aToHex(
    blake2AsU8a(data, bitLength, key, onlyJs)
  );
}
