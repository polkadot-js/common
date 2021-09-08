// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { u8aToHex } from '@polkadot/util';

import { randomAsU8a } from './asU8a';

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
export function randomAsHex (length = 32): HexString {
  return u8aToHex(
    randomAsU8a(length)
  );
}
