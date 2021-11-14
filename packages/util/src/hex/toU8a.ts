// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

import { HEX_TO_U8, HEX_TO_U16 } from './alphabet';
import { hexStripPrefix } from './stripPrefix';

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
export function hexToU8a (_value?: HexString | string | null, bitLength = -1): Uint8Array {
  if (!_value) {
    return new Uint8Array();
  }

  const value = hexStripPrefix(_value).toLowerCase();
  const valLength = value.length / 2;
  const resultLength = Math.ceil(
    bitLength === -1
      ? valLength
      : bitLength / 8
  );
  const result = new Uint8Array(resultLength);
  const offset = resultLength > valLength
    ? resultLength - valLength
    : 0;

  // With offsets, it becomes slightly trickier since we need to ensure the U16
  // is at the correct alignment as well. Due to this, we just focus on the simple
  // case where we do no bitlength conversions (which is the most-taken path)
  if (offset) {
    for (let i = 0; i < resultLength; i++) {
      result[i + offset] = HEX_TO_U8[value.substr(i * 2, 2)];
    }
  } else {
    // NOTE: It is only _slightly_ more optimal to use HEX_TO_U16 here as
    // well. The overhead does not seem to be in the lookup map iteration,
    // even with 640k inputs
    const mod = resultLength % 2;
    const u16 = new Uint16Array(result.buffer, 0, (resultLength - mod) / 2);

    for (let i = 0; i < u16.length; i++) {
      u16[i] = HEX_TO_U16[value.substr(i * 4, 4)];
    }

    if (mod) {
      result[resultLength - 1] = HEX_TO_U8[value.substr(value.length - 2, 2)];
    }
  }

  return result;
}
