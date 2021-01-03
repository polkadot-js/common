// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type BN from 'bn.js';
import type { ToBn } from '../types';

import { bnToBn } from '../bn/toBn';
import { formatDecimal } from './formatDecimal';

export function formatNumber <ExtToBn extends ToBn> (value?: ExtToBn | BN | BigInt | number | null): string {
  return formatDecimal(bnToBn(value).toString());
}
