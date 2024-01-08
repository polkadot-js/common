// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name arrayZip
 * @description Combines 2 distinct key/value arrays into a single [K, V] array
 */
export function arrayZip <K, V> (keys: readonly K[], values: readonly V[]): [K, V][] {
  const count = keys.length;
  const result = new Array<[K, V]>(count);

  for (let i = 0; i < count; i++) {
    result[i] = [keys[i], values[i]];
  }

  return result;
}
