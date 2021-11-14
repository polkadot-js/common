// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

import { u8aToU8a } from './toU8a';

interface Constructor<T extends BigUint64Array | Uint32Array | Uint16Array | Uint8Array> {
  BYTES_PER_ELEMENT: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new(...args: any[]): T;
}

// React-native does not have BigUint64Array, check others as well
const U64_BYTES = typeof BigUint64Array !== 'undefined'
  ? BigUint64Array.BYTES_PER_ELEMENT
  : 0;
const U32_BYTES = typeof Uint32Array !== 'undefined'
  ? Uint32Array.BYTES_PER_ELEMENT
  : 0;
const U16_BYTES = typeof Uint16Array !== 'undefined'
  ? Uint16Array.BYTES_PER_ELEMENT
  : 0;

// Creates a Uint8Array, ensuring that the alignment is correct
function createArray <T extends BigUint64Array | Uint32Array | Uint16Array | Uint8Array> (Clazz: Constructor<T>, value: Uint8Array): T {
  // The byteOffset needs to match the size of the data, i.e. for Uint32 it needs to be 4
  // NOTE: DataView doesn't have this limitation, but getters are slower
  const align = Clazz.BYTES_PER_ELEMENT;

  return value.byteOffset % align
    ? new Clazz(value.buffer.slice(value.byteOffset), 0, value.length / align)
    : new Clazz(value.buffer, value.byteOffset, value.length / align);
}

function equalsArray <T extends BigUint64Array | Uint32Array | Uint16Array | Uint8Array> (a: T, b: T): boolean {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

function equals (a: Uint8Array, b: Uint8Array): boolean {
  if (a.length === b.length) {
    return U64_BYTES && (a.length % U64_BYTES)
      ? U32_BYTES && (a.length % U32_BYTES)
        ? U16_BYTES && (a.length % U16_BYTES)
          ? equalsArray(a, b)
          : equalsArray(createArray(Uint16Array, a), createArray(Uint16Array, b))
        : equalsArray(createArray(Uint32Array, a), createArray(Uint32Array, b))
      : equalsArray(createArray(BigUint64Array, a), createArray(BigUint64Array, b));
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
