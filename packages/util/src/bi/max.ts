// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '../assert';

/**
 * @name nMax
 * @summary Finds and returns the highest value in an array of bigint.
 */
export function nMax (...items: bigint[]): bigint {
  assert(items.length >= 1, 'Must provide one or more bigint arguments');

  let result = items[0];

  for (let i = 1; i < items.length; i++) {
    if (items[i] > result) {
      result = items[i];
    }
  }

  return result;
}
