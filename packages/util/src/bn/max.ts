// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import assert from '../assert';

/**
 * @name max
 * @summary Finds and returns the highest value in an array of BNs.
 * @example
 * <BR>
 *
 * ```javascript
 * import BN from 'bn.js';
 * import { max } from '@polkadot/util';
 *
 * max([new BN(1), new BN(3), new BN(2)]).toString(); // => '3'
 * ```
 */
export default function max (
  ...items: BN[]
): BN {
  assert(
    items && items.length >= 1,
    'Must provide one or more BN arguments'
  );

  return items.reduce((acc: BN, val: BN) => BN.max(acc, val), items[0]);
}
