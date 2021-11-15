// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

import { u8aToU8a } from './toU8a';

function equals (a: Uint8Array, b: Uint8Array): boolean {
  if (a.length === b.length) {
    const dvA = new DataView(a.buffer, a.byteOffset);
    const dvB = new DataView(b.buffer, b.byteOffset);
    const mod = a.length % 4;
    const length = a.length - mod;

    for (let i = 0; i < length; i += 4) {
      if (dvA.getUint32(i) !== dvB.getUint32(i)) {
        return false;
      }
    }

    for (let i = length; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  return false;
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
export function u8aEq (a: HexString | Uint8Array | string, b: HexString | Uint8Array | string): boolean {
  return equals(u8aToU8a(a), u8aToU8a(b));
}
