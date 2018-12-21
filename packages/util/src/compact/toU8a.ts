// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BitLength } from './types';

import BN from 'bn.js';

import { bnToBn, bnToU8a } from '../bn';
import { u8aConcat } from '../u8a';
import { DEFAULT_BITLENGTH } from './defaults';

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
export default function compactToU8a (_value: BN | number, bitLength: BitLength = DEFAULT_BITLENGTH): Uint8Array {
  const value = bnToBn(_value);

  if (value.lte(MAX_U8)) {
    return new Uint8Array([value.toNumber() << 2]);
  } else if (value.lte(MAX_U16)) {
    return bnToU8a(value.shln(2).addn(0b01), 16, true);
  } else if (value.lte(MAX_U32)) {
    return bnToU8a(value.shln(2).addn(0b10), 32, true);
  }

  return u8aConcat(
    new Uint8Array([
      // FIXME For optimal encoding, detemine actual used bit (do not just use max)
      new BN(bitLength / 8)
        .subn(4) // at least 4
        .shln(2) // clear low
        .addn(0b11) // add flag
        .toNumber()
    ]),
    bnToU8a(value, bitLength, true)
  );
}
