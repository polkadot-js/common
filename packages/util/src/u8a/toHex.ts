// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayRange } from '../array';

const ALPHABET = arrayRange(256).map((n) => n.toString(16).padStart(2, '0'));

/** @internal */
function extract (value: Uint8Array): string {
  const result = new Array<string>(value.length);

  for (let i = 0; i < value.length; i++) {
    result[i] = ALPHABET[value[i]];
  }

  return result.join('');
}

/** @internal */
function trim (value: Uint8Array, halfLength: number): string {
  return `${u8aToHex(value.subarray(0, halfLength), -1, false)}…${u8aToHex(value.subarray(value.length - halfLength), -1, false)}`;
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
export function u8aToHex (value?: Uint8Array | null, bitLength = -1, isPrefixed = true): string {
  const prefix = isPrefixed
    ? '0x'
    : '';

  if (!value?.length) {
    return prefix;
  }

  const byteLength = Math.ceil(bitLength / 8);

  return prefix + (
    (byteLength > 0 && value.length > byteLength)
      ? trim(value, Math.ceil(byteLength / 2))
      : extract(value)
  );
}
