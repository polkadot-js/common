// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name arrayUnzip
 * @description Splits a single [K, V][] into [K[], V[]]
 */
export function arrayUnzip <K, V> (entries: readonly [K, V][]): [K[], V[]] {
  const count = entries.length;
  const keys = new Array<K>(count);
  const values = new Array<V>(count);

  for (let i = 0; i < count; i++) {
    [keys[i], values[i]] = entries[i];
  }

  return [keys, values];
}
