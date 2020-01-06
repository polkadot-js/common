// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util';

import randomAsU8a from './asU8a';

/**
 * @name randomAsHex
 * @summary Creates a hex string filled with random bytes.
 * @description
 * Returns a hex string with the specified (optional) length filled with random bytes.
 * @example
 * <BR>
 *
 * ```javascript
 * import { randomAsHex } from '@polkadot/util-crypto';
 *
 * randomAsHex(); // => 0x...
 * ```
 */
export default function randomAsHex (length = 32): string {
  return u8aToHex(
    randomAsU8a(length)
  );
}
