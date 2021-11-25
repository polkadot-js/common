// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn';
import type { ToBigInt, ToBn } from '../types';

import { assert } from '../assert';
import { _0n, _1n, _n, BI_MAX_INTEGER } from './consts';
import { biToBigInt } from './toBigInt';

const SQRT_MAX_SAFE_INTEGER = _n(94906265);

/**
 * @name biSqrt
 * @summary Calculates the integer square root of a bigint
 */
export function biSqrt <ExtToBn extends ToBn | ToBigInt> (value: ExtToBn | BN | bigint | string | number | null): bigint {
  const n = biToBigInt(value);

  assert(n >= _0n, 'square root of negative numbers is not supported');

  // https://stackoverflow.com/questions/53683995/javascript-big-integer-square-root/
  // shortcut <= 2^53 - 1 to use the JS utils
  if (n <= BI_MAX_INTEGER) {
    return BigInt(Math.floor(Math.sqrt(Number(n))));
  }

  // Use sqrt(MAX_SAFE_INTEGER) as starting point. since we already know the
  // output will be larger than this, we expect this to be a safe start
  let x0 = SQRT_MAX_SAFE_INTEGER;

  while (true) {
    const x1 = ((n / x0) + x0) >> _1n;

    if (x0 === x1 || (x0 === (x1 - _1n))) {
      return x0;
    }

    x0 = x1;
  }
}
