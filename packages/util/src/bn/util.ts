// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '../assert';
import { BN } from './bn';

export function checkMaxMin (type: 'max' | 'min', items: BN[]): BN {
  assert(items.length >= 1, 'Must provide one or more BN arguments');

  let result = items[0];

  for (const v of items) {
    result = BN[type](result, v);
  }

  return result;
}
