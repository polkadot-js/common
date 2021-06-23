// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function arrayShuffle <T> (input: T[]): T[] {
  const result = [...input];
  let curr = result.length;

  if (curr === 1) {
    return result;
  }

  while (curr !== 0) {
    const rand = Math.floor(Math.random() * curr);

    curr--;

    [result[curr], result[rand]] = [result[rand], result[curr]];
  }

  return result;
}
