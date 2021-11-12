// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexDigit, HexString } from '../types';

import { arrayRange } from '../array';

type HexByte = `${HexDigit}${HexDigit}`;

const ALPHABET = arrayRange(256).map((n) => n.toString(16).padStart(2, '0') as HexByte);

/** @internal */
function hex (value: Uint8Array): string {
  const result = new Array<HexByte>(value.length);

  for (let i = 0; i < value.length; i++) {
    result[i] = ALPHABET[value[i]];
  }

  return result.join('');
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
