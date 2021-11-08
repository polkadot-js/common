// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

import { assert } from '../assert';
import { isHex } from '../is/hex';
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
export function hexToU8a (value?: HexString | string | null, bitLength = -1): Uint8Array {
  if (!value) {
    return new Uint8Array();
  }

  assert(isHex(value), () => `Expected hex value to convert, found '${value}'`);

  const buf = Buffer.from(hexStripPrefix(value), 'hex');
  const valLength = buf.length / 2;
  const resultLength = Math.ceil(
    bitLength === -1
      ? valLength
      : bitLength / 8
  );

  if (resultLength === valLength) {
    return Uint8Array.from(buf);
  }

  const offset = Math.max(0, resultLength - valLength);

  if (offset) {
    const u8a = new Uint8Array(resultLength);

    u8a.set(buf, offset);

    return u8a;
  }

  return Uint8Array.from(buf.slice(0, resultLength));
}
