// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name _n
 * @description Creates a new instance of BigInt in environments that do support it
 */
export function _n (n: string | number | bigint | boolean): bigint {
  return typeof BigInt === 'function' && typeof BigInt.asIntN === 'function'
    ? BigInt(n)
    : Number.NaN as unknown as bigint;
}

/**
 * @name _0n
 * @summary BigInt constant for 0.
 */
export const _0n = _n(0);

/**
 * @name _1n
 * @summary BigInt constant for 1.
 */
export const _1n = _n(1);

/**
 * @name _1Mn
 * @summary BigInt constant for 1,000,000.
 */
export const _1Mn = _n(1_000_000);

/**
* @name _1Bn
* @summary BigInt constant for 1,000,000,000.
*/
export const _1Bn = _n(1_000_000_000);

/**
* @name _1Qn
* @summary BigInt constant for 1,000,000,000,000,000,000.
*/
export const _1Qn = _1Bn * _1Bn;

/**
* @name _2pow53n
* @summary BigInt constant for MAX_SAFE_INTEGER
*/
export const _2pow53n = _n(Number.MAX_SAFE_INTEGER);
