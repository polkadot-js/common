// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aCmp } from './cmp';
import { u8aToU8a } from './toU8a';

function equals (a: Uint8Array, b: Uint8Array): boolean {
  return (a.length === b.length) && (u8aCmp(a, b) === 0);
}

/**
 * @name u8aEq
 * @summary Compares two Uint8Arrays for equality.
 * @description
 * For `UInt8Array` (or hex string) input values true if there is a match.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aEq } from '@polkadot/util';
 *
 * u8aEq(new Uint8Array([0x68, 0x65]), new Uint8Array([0x68, 0x65])); // true
 * ```
 */
export function u8aEq (a: Uint8Array | string, b: Uint8Array | string): boolean {
  return equals(u8aToU8a(a), u8aToU8a(b));
}
