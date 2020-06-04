// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

/**
 * @name BN_ZERO
 * @summary BN constant for 0.
 */
const BN_ZERO: BN = new BN(0);

/**
 * @name BN_ONE
 * @summary BN constant for 1.
 */
const BN_ONE: BN = new BN(1);

/**
 * @name BN_TEN
 * @summary BN constant for 10.
 */
const BN_TEN: BN = new BN(10);

/**
 * @name BN_HUNDRED
 * @summary BN constant for 100.
 */
const BN_HUNDRED: BN = new BN(100);

/**
 * @name BN_THOUSAND
 * @summary BN constant for 1000.
 */
const BN_THOUSAND: BN = new BN(1000);

export {
  BN_ZERO,
  BN_ONE,
  BN_TEN,
  BN_HUNDRED,
  BN_THOUSAND
};
