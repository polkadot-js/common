// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexAddPrefix } from '@polkadot/util';

import xxhash64AsRaw from './asRaw';

/**
 * @name xxhash64AsHex
 * @summary Creates a xxhash hex from the input.
 * @description
 * From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a hex string.
 * @example
 * <BR>
 *
 * ```javascript
 * import { xxhash64AsHex } from '@polkadot/util-crypto';
 *
 * xxhash64AsHex('abcd', 0xabcd)); // => 0xe29f70f8b8c96df7
 * ```
 */
export default function xxhash64AsHex (data: Buffer | Uint8Array | string, seed: number): string {
  return hexAddPrefix(
    xxhash64AsRaw(data, seed)
  );
}
