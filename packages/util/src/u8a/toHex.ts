// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '../types';

const U8 = new Array<string>(256);
const U16 = new Array<string>(256 * 256);

for (let n = 0; n < 256; n++) {
  const hex = n.toString(16).padStart(2, '0');

  U8[n] = hex;
}

for (let i = 0; i < 256; i++) {
  const s = i << 8;

  for (let j = 0; j < 256; j++) {
    const hex = U8[i] + U8[j];
    const n = s | j;

    U16[n] = hex;
  }
}

/** @internal */
function hex (value: Uint8Array): string {
  const mod = value.length % 2;
  const length = value.length - mod;
  const dv = new DataView(value.buffer, value.byteOffset);
  let result = '';

  for (let i = 0; i < length; i += 2) {
    // we only use getUint16 here instead of getUint32 - at least in our
    // tests this is faster to execute (both long & short strings tested)
    result += U16[dv.getUint16(i)];
  }

  if (mod) {
    result += U8[dv.getUint8(length)];
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
      : (bitLength > 0 && value.length > length)
        ? `${hex(value.subarray(0, length / 2))}…${hex(value.subarray(value.length - length / 2))}`
        : hex(value)
  }` as HexString;
}
