// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBnOptions } from '../types';

import { hexToU8a } from '../hex/toU8a';
import { reverseHex, twoComplement } from '../hex/util';
import { isBoolean } from '../is/boolean';
import { objectSpread } from '../object/spread';
import { u8aToHex } from './toHex';

/**
 * @name u8aToBigInt
 * @summary Creates a BigInt from a Uint8Array object.
 */
export function u8aToBigInt (value: Uint8Array, options: ToBnOptions = { isLe: true, isNegative: false }): bigint {
  const { isLe, isNegative }: ToBnOptions = objectSpread(
    { isLe: true, isNegative: false },
    isBoolean(options)
      ? { isLe: options }
      : options
  );

  const hex = u8aToHex(value, -1, false);
  const input = isLe
    ? reverseHex(hex)
    : hex;

  return isNegative
    ? (BigInt(u8aToHex(twoComplement(hexToU8a(input)))) * -1n) - 1n
    : BigInt(input);
}
