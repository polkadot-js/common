// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '../assert';

/** @internal */
function gt (a: bigint, b: bigint): boolean {
  return a > b;
}

/** @internal */
function lt (a: bigint, b: bigint): boolean {
  return a < b;
}

/** @internal */
function createCmp (cmp: (a: bigint, b: bigint) => boolean): (...items: bigint[]) => bigint {
  return (...items: bigint[]): bigint => {
    assert(items.length >= 1, 'Must provide one or more bigint arguments');

    let result = items[0];

    for (let i = 1; i < items.length; i++) {
      if (cmp(items[i], result)) {
        result = items[i];
      }
    }

    return result;
  };
}

/**
 * @name nMax
 * @summary Finds and returns the highest value in an array of bigint.
 */
export const nMax = createCmp(gt);

/**
 * @name nMin
 * @summary Finds and returns the lowest value in an array of bigint.
 */
export const nMin = createCmp(lt);
