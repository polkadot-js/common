// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn';
import type { ToBn } from '../types';

import { bnToBn } from '../bn/toBn';
import { formatDecimal } from './formatDecimal';
import { getSeparator } from '../number';

interface Options {
  /**
   * @description The locale to use
   */
  locale?: string;
}

/**
 * @name formatNumber
 * @description Formats a number into string format with thousand separators
 */
export function formatNumber <ExtToBn extends ToBn> (
  value?: ExtToBn | BN | bigint | number | null,
  { locale = 'en' }: Options = {}
): string {
  const { thousand } = getSeparator(locale);
  return formatDecimal(bnToBn(value).toString(), thousand);
}
