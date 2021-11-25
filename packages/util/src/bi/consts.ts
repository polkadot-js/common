// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { newBigInt } from './new';

/**
 * @name BI_ZERO
 * @summary BigInt constant for 0.
 */
export const BI_ZERO = newBigInt(0);

/**
 * @name BI_ONE
 * @summary BigInt constant for 0.
 */
export const BI_ONE = newBigInt(1);

/**
 * @name BI_MILLION
 * @summary BigInt constant for 1,000,000.
 */
export const BI_MILLION = newBigInt(1_000_000);

/**
* @name BI_BILLION
* @summary BigInt constant for 1,000,000,000.
*/
export const BI_BILLION = newBigInt(1_000_000_000);

/**
* @name BI_QUINTILL
* @summary BigInt constant for 1,000,000,000,000,000,000.
*/
export const BI_QUINTILL = BI_BILLION
  ? BI_BILLION * BI_BILLION
  : undefined;

/**
* @name BI_MAX_INTEGER
* @summary BigInt constant for MAX_SAFE_INTEGER
*/
export const BI_MAX_INTEGER = newBigInt(Number.MAX_SAFE_INTEGER);
