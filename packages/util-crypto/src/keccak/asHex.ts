// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '@polkadot/util';

import keccakAsU8a from './asU8a';

/**
 * @name keccakAsHex
 * @summary Creates a keccak hex string from the input.
 * @description
 * From either a `string` or a `Buffer` input, create the keccak and return the result as a `0x` prefixed hex string.
 * @example
 * <BR>
 *
 * ```javascript
 * import { keccakAsHex } from '@polkadot/util-crypto';
 *
 * keccakAsHex('123'); // => 0x...
 * ```
 */
export default function keccakAsHex (value: Buffer | Uint8Array | string): string {
  return u8aToHex(
    keccakAsU8a(value)
  );
}
