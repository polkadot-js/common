// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BN } from './bn.js';

/**
 * @name BN_ZERO
 * @summary BN constant for 0.
 */
export const BN_ZERO: BN = /*#__PURE__*/ new BN(0);

/**
 * @name BN_ONE
 * @summary BN constant for 1.
 */
export const BN_ONE: BN = /*#__PURE__*/ new BN(1);

/**
 * @name BN_TWO
 * @summary BN constant for 2.
 */
export const BN_TWO: BN = /*#__PURE__*/ new BN(2);

/**
 * @name BN_THREE
 * @summary BN constant for 3.
 */
export const BN_THREE: BN = /*#__PURE__*/ new BN(3);

/**
 * @name BN_FOUR
 * @summary BN constant for 4.
 */
export const BN_FOUR: BN = /*#__PURE__*/ new BN(4);

/**
 * @name BN_FIVE
 * @summary BN constant for 5.
 */
export const BN_FIVE: BN = /*#__PURE__*/ new BN(5);

/**
 * @name BN_SIX
 * @summary BN constant for 6.
 */
export const BN_SIX: BN = /*#__PURE__*/ new BN(6);

/**
 * @name BN_SEVEN
 * @summary BN constant for 7.
 */
export const BN_SEVEN: BN = /*#__PURE__*/ new BN(7);

/**
 * @name BN_EIGHT
 * @summary BN constant for 8.
 */
export const BN_EIGHT: BN = /*#__PURE__*/ new BN(8);

/**
 * @name BN_NINE
 * @summary BN constant for 9.
 */
export const BN_NINE: BN = /*#__PURE__*/ new BN(9);

/**
 * @name BN_TEN
 * @summary BN constant for 10.
 */
export const BN_TEN: BN = /*#__PURE__*/ new BN(10);

/**
 * @name BN_HUNDRED
 * @summary BN constant for 100.
 */
export const BN_HUNDRED: BN = /*#__PURE__*/ new BN(100);

/**
 * @name BN_THOUSAND
 * @summary BN constant for 1,000.
 */
export const BN_THOUSAND: BN = /*#__PURE__*/ new BN(1_000);

/**
 * @name BN_MILLION
 * @summary BN constant for 1,000,000.
 */
export const BN_MILLION: BN = /*#__PURE__*/ new BN(1_000_000);

/**
 * @name BN_BILLION
 * @summary BN constant for 1,000,000,000.
 */
export const BN_BILLION: BN = /*#__PURE__*/ new BN(1_000_000_000);

/**
 * @name BN_QUINTILL
 * @summary BN constant for 1,000,000,000,000,000,000.
 */
export const BN_QUINTILL: BN = BN_BILLION.mul(BN_BILLION);

/**
 * @name BN_MAX_INTEGER
 * @summary BN constant for MAX_SAFE_INTEGER
 */
export const BN_MAX_INTEGER: BN = /*#__PURE__*/ new BN(Number.MAX_SAFE_INTEGER);

/**
 * @name BN_SQRT_MAX_INTEGER
 * @summary BN constant for Math.sqrt(MAX_SAFE_INTEGER)
 */
export const BN_SQRT_MAX_INTEGER: BN = /*#__PURE__*/ new BN(94906265);
