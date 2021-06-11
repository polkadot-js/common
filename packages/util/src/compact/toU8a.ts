// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '../assert';
import { BN, BN_ONE, BN_TWO, bnToBn, bnToU8a } from '../bn';
import { u8aConcat } from '../u8a';

const MAX_U8 = new BN(2).pow(new BN(8 - 2)).subn(1);
const MAX_U16 = new BN(2).pow(new BN(16 - 2)).subn(1);
const MAX_U32 = new BN(2).pow(new BN(32 - 2)).subn(1);

/**
 * @name compactToU8a
 * @description Encodes a number into a compact representation
 * @example
 * <BR>
 *
 * ```javascript
 * import { compactToU8a } from '@polkadot/util';
 *
 * console.log(compactToU8a(511, 32)); // Uint8Array([0b11111101, 0b00000111])
 * ```
 */
export function compactToU8a (_value: BN | BigInt | number): Uint8Array {
  const value = bnToBn(_value);

  if (value.lte(MAX_U8)) {
    return new Uint8Array([value.toNumber() << 2]);
  } else if (value.lte(MAX_U16)) {
    return bnToU8a(value.shln(2).iadd(BN_ONE), 16, true);
  } else if (value.lte(MAX_U32)) {
    return bnToU8a(value.shln(2).iadd(BN_TWO), 32, true);
  }

  const u8a = bnToU8a(value);
  let length = u8a.length;

  // adjust to the minimum number of bytes
  while (u8a[length - 1] === 0) {
    length--;
  }

  assert(length >= 4, 'Invalid length, previous checks match anything less than 2^30');

  return u8aConcat(
    // subtract 4 as minimum (also catered for in decoding)
    [((length - 4) << 2) + 0b11],
    u8a.subarray(0, length)
  );
}
