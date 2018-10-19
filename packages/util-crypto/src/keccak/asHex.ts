// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util/index';

import keccakAsU8a from './asU8a';

/**
 * @name keccakAsHex
 * @signature keccakAsHex (value: Buffer | Uint8Array | string): string
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
