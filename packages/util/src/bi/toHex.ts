// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn.js';
import type { HexString, NumberOptions, ToBigInt, ToBn } from '../types.js';

import { u8aToHex } from '../u8a/index.js';
import { nToU8a } from './toU8a.js';

/**
 * @name nToHex
 * @summary Creates a hex value from a bigint object.
 */
export function nToHex <ExtToBn extends ToBn | ToBigInt> (value?: ExtToBn | BN | bigint | number | null, { bitLength = -1, isLe = false, isNegative = false }: NumberOptions = {}): HexString {
  return u8aToHex(nToU8a(value || 0, { bitLength, isLe, isNegative }));
}
