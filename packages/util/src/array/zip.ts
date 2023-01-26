// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name arrayZip
 * @description Combines 2 distinct key/value arrays into a single [K, V] array
 */
export function arrayZip <K, V> (keys: readonly K[], values: readonly V[]): [K, V][] {
  const result = new Array<[K, V]>(keys.length);

  for (let i = 0; i < keys.length; i++) {
    result[i] = [keys[i], values[i]];
  }

  return result;
}
