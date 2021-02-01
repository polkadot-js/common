// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { assert } from '../assert';
import { BN_ONE, BN_TWO } from '../bn';

// https://golb.hplar.ch/2018/09/javascript-bigint.html
function newtonIteration (n: BN, x0: BN): BN {
  const x1 = n.div(x0).iadd(x0).ishrn(1);

  return (x0.eq(x1) || x0.eq(x1.sub(BN_ONE)))
    ? x0
    : newtonIteration(n, x1);
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
export function bnSqrt (value: BN): BN {
  assert(value.gten(0), 'square root of negative numbers is not supported');

  return value.lt(BN_TWO)
    ? value
    : newtonIteration(value, BN_ONE);
}
