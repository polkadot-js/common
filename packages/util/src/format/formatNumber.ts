// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ToBn } from '../types';

import BN from 'bn.js';

import bnToBn from '../bn/toBn';
import formatDecimal from './formatDecimal';

export default function formatNumber <ExtToBn extends ToBn> (value?: ExtToBn | BN | BigInt | number | null): string {
  return formatDecimal(bnToBn(value).toString());
}
