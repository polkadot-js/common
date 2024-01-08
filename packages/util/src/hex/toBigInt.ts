// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBnOptions } from '../types.js';

import { BigInt } from '@polkadot/x-bigint';

import { u8aToBigInt } from '../u8a/toBigInt.js';
import { hexToU8a } from './toU8a.js';

/**
 * @name hexToBigInt
 * @summary Creates a BigInt instance object from a hex string.
 */
export function hexToBigInt (value?: string | null, { isLe = false, isNegative = false }: ToBnOptions = {}): bigint {
  return !value || value === '0x'
    ? BigInt(0)
    : u8aToBigInt(hexToU8a(value), { isLe, isNegative });
}
