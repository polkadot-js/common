// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function arrayShuffle <T> (input: T[]): T[] {
  const result = input.slice();
  let curr = result.length;

  // noop for the single entry
  if (curr === 1) {
    return result;
  }

  while (curr !== 0) {
    // ~~ is more performant than Math.floor
    const rand = ~~(Math.random() * curr);

    curr--;

    [result[curr], result[rand]] = [result[rand], result[curr]];
  }

  return result;
}
