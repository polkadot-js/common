// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

import { U8_TO_HEX, U16_TO_HEX } from '../hex/alphabet';

const U16_SIZE = Uint16Array.BYTES_PER_ELEMENT;

/** @internal */
function hex (value: Uint8Array): string {
  const mod = value.length % U16_SIZE;

  // We need alignment of the Uint16Array, see u8aEq for rationale
  const u16 = value.byteOffset % U16_SIZE
    ? new Uint16Array(value.buffer.slice(value.byteOffset), 0, (value.length - mod) / U16_SIZE)
    : new Uint16Array(value.buffer, value.byteOffset, (value.length - mod) / U16_SIZE);
  let result = '';

  for (let i = 0; i < u16.length; i++) {
    result += U16_TO_HEX[u16[i]];
  }

  if (mod) {
    result += U8_TO_HEX[value[value.length - 1]];
  }

  return result;
}

/**
 * @name u8aToHex
 * @summary Creates a hex string from a Uint8Array object.
 * @description
 * `UInt8Array` input values return the actual hex string. `null` or `undefined` values returns an `0x` string.
 * @example
 * <BR>
 *
 * ```javascript
 * import { u8aToHex } from '@polkadot/util';
 *
 * u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
 * ```
 */
export function u8aToHex (value?: Uint8Array | null, bitLength = -1, isPrefixed = true): HexString {
  const length = Math.ceil(bitLength / 8);

  return `${isPrefixed ? '0x' : ''}${
    !value || !value.length
      ? ''
      : (length > 0 && value.length > length)
        ? `${hex(value.subarray(0, length / 2))}…${hex(value.subarray(value.length - length / 2))}`
        : hex(value)
  }` as HexString;
}
