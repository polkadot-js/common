// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

// This is supposed to be a faster concat...
// https://dev.to/uilicious/javascript-array-push-is-945x-faster-than-array-concat-1oki

/**
 * @name arrayFlatten
 * @summary Merge T[][] into T[]
 * @description
 * Returns a new array with all arrays merged into one
 * @example
 * <BR>
 *
 * ```javascript
 * import { arrayFlatten } from '@polkadot/util';
 *
 * arrayFlatten([[1, 2], [3, 4], [5]]); // [1, 2, 3, 4, 5]
 * ```
 */
export function arrayFlatten <T> (arrays: T[][]): T[] {
  // pre-allocate based on the combined size
  const output = new Array<T>(arrays.reduce((length, array) => length + array.length, 0));
  let index = -1;

  for (let a = 0; a < arrays.length; a++) {
    const array = arrays[a];

    // instead of pushing, we just set the entries
    for (let e = 0; e < array.length; e++) {
      output[++index] = array[e];
    }
  }

  return output;
}
