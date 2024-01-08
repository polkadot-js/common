// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aEq } from '@polkadot/util';

import { decodeAddress } from './decode.js';

/**
 * @name addressEq
 * @summary Compares two addresses, either in ss58, Uint8Array or hex format.
 * @description
 * For the input values, return true is the underlying public keys do match.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aEq } from '@polkadot/util';
 *
 * u8aEq(new Uint8Array([0x68, 0x65]), new Uint8Array([0x68, 0x65])); // true
 * ```
 */
export function addressEq (a: string | Uint8Array, b: string | Uint8Array): boolean {
  return u8aEq(decodeAddress(a), decodeAddress(b));
}
