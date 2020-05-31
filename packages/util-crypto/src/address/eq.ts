// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aEq } from '@polkadot/util';

import decode from './decode';

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
export default function addressEq (a: string | Uint8Array, b: string | Uint8Array): boolean {
  return u8aEq(decode(a), decode(b));
}
