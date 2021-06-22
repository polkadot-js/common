// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function arrayShuffle <T> (input: T[]): T[] {
  const result = [...input];
  let currentIndex = result.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);

    currentIndex--;

    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex], result[currentIndex]
    ];
  }

  return result;
}
