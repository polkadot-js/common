// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import blake2bAsHex from './blake2b/asHex';

/**
 * @name blake2AsHex
 * @signature blake2AsHex (data: Uint8Array, bitLength: number = 256): string
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
export default function blake2AsHex (data: Uint8Array, bitLength: number = 256): string {
  return blake2bAsHex(data, bitLength);
}
