// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name arrayChunk
 * @summary Split T[] into T[][] based on the defind size
 * @description
 * Returns a set ao arrays based on the chunksize
 * @example
 * <BR>
 *
 * ```javascript
 * import { arrayChunk } from '@polkadot/util';
 *
 * arrayChunk([1, 2, 3, 4, 5]); // [[1, 2], [3, 4], [5]]
 * ```
 */
export function arrayChunk <T> (array: T[], chunkSize: number): T[][] {
  const outputSize = Math.ceil(array.length / chunkSize);

  // shortcut for the single-split case
  if (outputSize === 1) {
    return [array];
  }

  const output = Array<T[]>(outputSize);

  for (let i = 0; i < outputSize; i++) {
    const offset = i * chunkSize;

    output[i] = array.slice(offset, offset + chunkSize);
  }

  return output;
}
