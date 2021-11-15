// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBnOptions } from '../types';

import { isBoolean } from '../is/boolean';
import { objectSpread } from '../object/spread';
import { u8aToHex } from '../u8a/toHex';
import { hexStripPrefix } from './stripPrefix';
import { hexToU8a } from './toU8a';
import { reverseHex, twoComplement } from './util';

/**
 * @name hexToBigInt
 * @summary Creates a BigInt instance object from a hex string.
 */
export function hexToBigInt (value?: string | null, options: ToBnOptions = { isLe: false, isNegative: false }): bigint {
  if (!value || value === '0x') {
    return BigInt(0);
  }

  const { isLe, isNegative }: ToBnOptions = objectSpread(
    { isLe: false, isNegative: false },
    isBoolean(options)
      ? { isLe: options }
      : options
  );
  const stripped = hexStripPrefix(value);
  const hex = `0x${isLe ? reverseHex(stripped) : stripped}`;

  return isNegative
    ? (BigInt(u8aToHex(twoComplement(hexToU8a(hex)))) * -1n) - 1n
    : BigInt(hex);
}
