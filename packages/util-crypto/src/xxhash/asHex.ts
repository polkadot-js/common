// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { u8aToHex } from '@polkadot/util';

import { xxhashAsU8a } from './asU8a';

/**
 * @name xxhashAsHex
 * @summary Creates a xxhash64 hex from the input.
 * @description
 * From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a hex string with the specified `bitLength`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { xxhashAsHex } from '@polkadot/util-crypto';
 *
 * xxhashAsHex('abc'); // => 0x44bc2cf5ad770999
 * ```
 */
export function xxhashAsHex (data: HexString | Buffer | Uint8Array | string, bitLength = 64): HexString {
  return u8aToHex(
    xxhashAsU8a(data, bitLength)
  );
}
