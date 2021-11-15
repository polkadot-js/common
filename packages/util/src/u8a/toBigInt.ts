// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBnOptions } from '../types';

import { objectSpread } from '../object/spread';

function xor (input: Uint8Array): Uint8Array {
  const result = new Uint8Array(input.length);

  for (let i = 0; i < input.length; i++) {
    result[i] = input[i] ^ 0xff;
  }

  return result;
}

function toBigInt (input: Uint8Array): bigint {
  let result = BigInt(0);

  for (let i = 0; i < input.length; i++) {
    result = (result * 256n) + BigInt(input[i]);
  }

  return result;
}

/**
 * @name u8aToBigInt
 * @summary Creates a BigInt from a Uint8Array object.
 */
export function u8aToBigInt (value: Uint8Array, options: ToBnOptions = {}): bigint {
  if (!value || !value.length) {
    return BigInt(0);
  }

  const { isLe, isNegative }: ToBnOptions = objectSpread({ isLe: true, isNegative: false }, options);
  const u8a = isLe
    ? value.reverse()
    : value;

  return isNegative
    ? ((toBigInt(xor(u8a)) * -1n) - 1n)
    : toBigInt(u8a);
}
