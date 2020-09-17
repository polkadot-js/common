// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ToBn } from '../types';

import BN from 'bn.js';

import bnToBn from '../bn/toBn';
import formatDecimal from './formatDecimal';

export default function formatNumber <ExtToBn extends ToBn> (value?: ExtToBn | BN | BigInt | number | null): string {
  return formatDecimal(bnToBn(value).toString());
}
