// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function arrayZip <K, V> (keys: K[], values: V[]): [K, V][] {
  const result: [K, V][] = new Array(keys.length);

  for (let i = 0; i < keys.length; i++) {
    result[i] = [keys[i], values[i]];
  }

  return result;
}
