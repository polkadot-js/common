// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { U8aLike } from '../types';

import { BN } from '../bn';
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

  // The u8a is manually converted here for 1, 2 & 4 lengths, it is 2x faster
  // than doing an additional call to u8aToBn (as with variable length)
  switch (u8a[0] & 0b11) {
    case 0b00:
      return [1, new BN(u8a[0] >>> 2)];

    case 0b01:
      return [2, new BN((u8a[0] + (u8a[1] * 0x1_00)) >>> 2)];

    case 0b10:
      return [4, new BN((u8a[0] + (u8a[1] * 0x1_00) + (u8a[2] * 0x1_00_00) + (u8a[3] * 0x1_00_00_00)) >>> 2)];

    default: { // 0b11
      // add 5 to shifted (4 for base length, 1 for this byte)
      const offset = (u8a[0] >>> 2) + 5;

      return [offset, u8aToBn(u8a.subarray(1, offset))];
    }
  }
}
