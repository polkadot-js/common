// Copyright 2017-2025 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name arrayRange
 * @summary Returns a range of numbers ith the size and the specified offset
 * @description
 * Returns a new array of numbers with the specific size. Optionally, when `startAt`, is provided, it generates the range to start at a specific value.
 * @example
 * <BR>
 *
 * ```javascript
 * import { arrayRange } from '@polkadot/util';
 *
 * arrayRange(5); // [0, 1, 2, 3, 4]
 * arrayRange(3, 5); // [5, 6, 7]
 * ```
 */
export function arrayRange (size: number, startAt = 0): number[] {
  if (size <= 0) {
    throw new Error('Expected non-zero, positive number as a range size');
  }

  const result = new Array<number>(size);

  for (let i = 0; i < size; i++) {
    result[i] = i + startAt;
  }

  return result;
}
