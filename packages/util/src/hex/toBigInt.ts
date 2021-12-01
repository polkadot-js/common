// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ToBnOptions } from '../types';

import { _n } from '../bi/consts';
import { objectSpread } from '../object/spread';
import { u8aToBigInt } from '../u8a/toBigInt';
import { hexToU8a } from './toU8a';

/**
 * @name hexToBigInt
 * @summary Creates a BigInt instance object from a hex string.
 */
export function hexToBigInt (value?: string | null, options: ToBnOptions = {}): bigint {
  if (!value || value === '0x') {
    return _n(0);
  }

  return u8aToBigInt(
    hexToU8a(value),
    objectSpread({ isLe: false, isNegative: false }, options)
  );
}
