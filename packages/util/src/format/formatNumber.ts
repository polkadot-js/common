// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn';
import type { ToBn } from '../types';

import { bnToBn } from '../bn/toBn';
import { formatDecimal } from './formatDecimal';

/**
 * @name formatNumber
 * @description Formats a number into string format with thousand seperators
 */
export function formatNumber <ExtToBn extends ToBn> (value?: ExtToBn | BN | bigint | number | null): string {
  return formatDecimal(bnToBn(value).toString());
}
