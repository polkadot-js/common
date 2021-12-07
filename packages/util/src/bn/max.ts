// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '../assert';
import { BN } from './bn';

export function checkMaxMin (type: 'max' | 'min', items: BN[]): BN {
  assert(items.length >= 1, 'Must provide one or more BN arguments');

  let result = items[0];

  for (let i = 1; i < items.length; i++) {
    result = BN[type](result, items[i]);
  }

  return result;
}

/**
 * @name bnMax
 * @summary Finds and returns the highest value in an array of BNs.
 * @example
 * <BR>
 *
 * ```javascript
 * import BN from 'bn.js';
 * import { bnMax } from '@polkadot/util';
 *
 * bnMax([new BN(1), new BN(3), new BN(2)]).toString(); // => '3'
 * ```
 */
export function bnMax (...items: BN[]): BN {
  return checkMaxMin('max', items);
}
