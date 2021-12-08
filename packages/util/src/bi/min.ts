// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '../assert';

function gt (a: bigint, b: bigint): boolean {
  return a > b;
}

function lt (a: bigint, b: bigint): boolean {
  return a < b;
}

function find (items: bigint[], cmp: (a: bigint, b: bigint) => boolean): bigint {
  assert(items.length >= 1, 'Must provide one or more bigint arguments');

  let result = items[0];

  for (let i = 1; i < items.length; i++) {
    if (cmp(items[i], result)) {
      result = items[i];
    }
  }

  return result;
}

/**
 * @name nMax
 * @summary Finds and returns the highest value in an array of bigint.
 */
export function nMax (...items: bigint[]): bigint {
  return find(items, gt);
}

/**
 * @name nMin
 * @summary Finds and returns the lowest value in an array of bigint.
 */
export function nMin (...items: bigint[]): bigint {
  return find(items, lt);
}
