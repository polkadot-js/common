// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '../assert';
import { BN } from '../bn/consts';

export function checkMaxMin (type: 'max' | 'min', items: BN[]): BN {
  assert(items.length >= 1, 'Must provide one or more BN arguments');

  return items.reduce<BN>((a, v) => BN[type](a, v), items[0]);
}
