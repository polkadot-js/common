// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

import { hexStripPrefix } from './stripPrefix';

const CHARS = '0123456789abcdef';
const UNHEX = new Array<number>(256);

for (let i = 0; i < CHARS.length; i++) {
  UNHEX[CHARS[i].charCodeAt(0)] = i;

  if (i > 9) {
    UNHEX[CHARS[i].toUpperCase().charCodeAt(0)] = i;
  }
}

/**
 * @name hexToU8a
 * @summary Creates a Uint8Array object from a hex string.
 * @description
 * `null` inputs returns an empty `Uint8Array` result. Hex input values return the actual bytes value converted to a Uint8Array. Anything that is not a hex string (including the `0x` prefix) throws an error.
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexToU8a } from '@polkadot/util';
 *
 * hexToU8a('0x80001f'); // Uint8Array([0x80, 0x00, 0x1f])
 * hexToU8a('0x80001f', 32); // Uint8Array([0x00, 0x80, 0x00, 0x1f])
 * ```
 */
export function hexToU8a (value?: HexString | string | null, bitLength = -1): Uint8Array {
  if (!value) {
    return new Uint8Array();
  }

  const str = hexStripPrefix(value);
  const strLength = str.length / 2;
  const endLength = Math.ceil(
    bitLength === -1
      ? strLength
      : bitLength / 8
  );
  const result = new Uint8Array(endLength);
  const offset = endLength > strLength
    ? endLength - strLength
    : 0;

  for (let i = offset, s = 0; i < endLength; i++, s += 2) {
    // The big factor here is actually the string lookups. If we do
    // HEX_TO_U16[value.substring()] we get an 10x slowdown. In the
    // same vein using charCodeAt (as opposed to value[s] or value.charAt(s)) is
    // also the faster operation by at least 2x with the character map above
    result[i] = ((UNHEX[str.charCodeAt(s)] << 4) + UNHEX[str.charCodeAt(s + 1)]) | 0;
  }

  return result;
}
