// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString, NumberOptions, ToBn } from '../types';
import type { BN } from './bn';

import { u8aToHex } from '../u8a';
import { bnToU8a } from './toU8a';

const ZERO_STR = '0x00';

/**
 * @name bnToHex
 * @summary Creates a hex value from a BN.js bignumber object.
 * @description
 * `null` inputs returns a `0x` result, BN values return the actual value as a `0x` prefixed hex value. Anything that is not a BN object throws an error. With `bitLength` set, it fixes the number to the specified length.
 * @example
 * <BR>
 *
 * ```javascript
 * import BN from 'bn.js';
 * import { bnToHex } from '@polkadot/util';
 *
 * bnToHex(new BN(0x123456)); // => '0x123456'
 * ```
 */
export function bnToHex <ExtToBn extends ToBn> (value?: ExtToBn | BN | bigint | number | null, { bitLength = -1, isLe = false, isNegative = false }: NumberOptions = {}): HexString {
  return !value
    ? ZERO_STR
    : u8aToHex(bnToU8a(value, { bitLength, isLe, isNegative }));
}
