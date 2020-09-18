// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

/**
 * @name isBn
 * @summary Tests for a `BN` object instance.
 * @description
 * Checks to see if the input object is an instance of `BN` (bn.js).
 * @example
 * <BR>
 *
 * ```javascript
 * import BN from 'bn.js';
 * import { isBn } from '@polkadot/util';
 *
 * console.log('isBn', isBn(new BN(1))); // => true
 * ```
 */
export default function isBn (value: unknown): value is BN {
  return BN.isBN(value);
}
