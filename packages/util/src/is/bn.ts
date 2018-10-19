// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';

/**
 * @name isBn
 * @signature isBN (value: any): boolean
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
export default function isBn (value: any): value is BN {
  return BN.isBN(value);
}
