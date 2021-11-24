// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name BI_MILLION
 * @summary BigInt constant for 1,000,000.
 */
export const BI_MILLION = 1_000_000n;

/**
* @name BI_BILLION
* @summary BigInt constant for 1,000,000,000.
*/
export const BI_BILLION = 1_000_000_000n;

/**
* @name BI_QUINTILL
* @summary BigInt constant for 1,000,000,000,000,000,000.
*/
export const BI_QUINTILL = BI_BILLION * BI_BILLION;

/**
* @name BI_MAX_INTEGER
* @summary BigInt constant for MAX_SAFE_INTEGER
*/
export const BI_MAX_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);
