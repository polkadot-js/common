// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

import { u8aToU8a } from './toU8a';

function equalsUxA <T extends Uint32Array | Uint16Array | Uint8Array> (a: T, b: T): boolean {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

function equals (a: Uint8Array, b: Uint8Array): boolean {
  if (a.length === b.length) {
    return a.length % 4
      ? a.length % 2
        ? equalsUxA(a, b)
        : equalsUxA(new Uint16Array(a.buffer, a.byteOffset, a.length / 2), new Uint16Array(b.buffer, b.byteOffset, b.length / 2))
      : equalsUxA(new Uint32Array(a.buffer, a.byteOffset, a.length / 4), new Uint32Array(b.buffer, b.byteOffset, b.length / 4));
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
