// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import assert from '../assert';

// https://golb.hplar.ch/2018/09/javascript-bigint.html
function newtonIteration (n: BN, x0: BN): BN {
  const x1 = n.div(x0).add(x0).shrn(1);

  if (x0.eq(x1) || x0.eq(x1.subn(1))) {
    return x0;
  }

  return newtonIteration(n, x1);
}

/**
 * @name bnSqrt
 * @summary Calculates the integer square root of a BN
 * @example
 * <BR>
 *
 * ```javascript
 * import BN from 'bn.js';
 * import { bnSqrt } from '@polkadot/util';
 *
 * bnSqrt(new BN(16)).toString(); // => '4'
 * ```
 */
export default function sqrt (value: BN): BN {
  assert(value.gten(0), 'square root of negative numbers is not supported');

  return value.ltn(2)
    ? value
    : newtonIteration(value, new BN(1));
}
