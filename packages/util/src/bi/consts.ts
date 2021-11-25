// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

type NewBigInt = (value: string | number | bigint | boolean) => bigint;

/**
 * @name _BigInt
 * @description Creates a new instance of BigInt in environments that do support it
 */
export const _BigInt: NewBigInt = typeof BigInt !== 'undefined'
  ? BigInt
  : () => Number.NaN as unknown as bigint;

/**
 * @name BI_ZERO
 * @summary BigInt constant for 0.
 */
export const BI_ZERO = _BigInt(0);

/**
 * @name BI_ONE
 * @summary BigInt constant for 1.
 */
export const BI_ONE = _BigInt(1);

/**
 * @name BI_MILLION
 * @summary BigInt constant for 1,000,000.
 */
export const BI_MILLION = _BigInt(1_000_000);

/**
* @name BI_BILLION
* @summary BigInt constant for 1,000,000,000.
*/
export const BI_BILLION = _BigInt(1_000_000_000);

/**
* @name BI_QUINTILL
* @summary BigInt constant for 1,000,000,000,000,000,000.
*/
export const BI_QUINTILL = BI_BILLION * BI_BILLION;

/**
* @name BI_MAX_INTEGER
* @summary BigInt constant for MAX_SAFE_INTEGER
*/
export const BI_MAX_INTEGER = _BigInt(Number.MAX_SAFE_INTEGER);
