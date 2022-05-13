// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { U8aLike } from '../types';

import { BN, BN_FIVE } from '../bn';
import { u8aToBn, u8aToU8a } from '../u8a';

/**
 * @name compactFromU8a
 * @description Retrives the offset and encoded length from a compact-prefixed value
 * @example
 * <BR>
 *
 * ```javascript
 * import { compactFromU8a } from '@polkadot/util';
 *
 * const [offset, length] = compactFromU8a(new Uint8Array([254, 255, 3, 0]));
 *
 * console.log('value offset=', offset, 'length=', length); // 4, 0xffff
 * ```
 */
export function compactFromU8a (input: U8aLike): [number, BN] {
  const u8a = u8aToU8a(input);
  const flag = u8a[0] & 0b11;

  // The u8a is manually converted here, it is 2x faster that doing an
  // additional call to u8aToBn
  if (flag === 0b00) {
    return [1, new BN(u8a[0] >>> 2)];
  } else if (flag === 0b01) {
    return [2, new BN((u8a[0] + (u8a[1] * 0x1_00)) >>> 2)];
  } else if (flag === 0b10) {
    return [4, new BN((u8a[0] + (u8a[1] * 0x1_00) + (u8a[2] * 0x1_00_00) + (u8a[3] * 0x1_00_00_00)) >>> 2)];
  }

  const offset = new BN(u8a[0])
    .ishrn(2) // clear flag
    .iadd(BN_FIVE) // add 4 for base length, 1 for this byte
    .toNumber();

  return [offset, u8aToBn(u8a.subarray(1, offset))];
}
