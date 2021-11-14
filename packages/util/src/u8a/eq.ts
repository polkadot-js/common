// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

import { u8aToU8a } from './toU8a';

export interface Constructor<T extends Uint32Array | Uint16Array | Uint8Array> {
  new(...args: unknown[]): T;
}

// Creates a Uint8Array, ensuring that the alignment is correct
function createUxA <T extends Uint32Array | Uint16Array | Uint8Array> (Clazz: Constructor<T>, value: Uint8Array, align: 2 | 4): T {
  return value.byteOffset % align
    ? new Clazz(value.buffer.slice(value.byteOffset), 0, value.length / align)
    : new Clazz(value.buffer, value.byteOffset, value.length / align);
}

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
        : equalsUxA(createUxA(Uint16Array, a, 2), createUxA(Uint16Array, b, 2))
      : equalsUxA(createUxA(Uint32Array, a, 4), createUxA(Uint32Array, b, 4));
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
