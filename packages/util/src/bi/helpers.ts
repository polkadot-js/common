// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/** @internal */
export function createCmp <T> (cmp: (a: T, b: T) => boolean): (...items: T[]) => T {
  return (...items: T[]): T => {
    const count = items.length;

    if (count === 0) {
      throw new Error('Must provide one or more arguments');
    }

    let result = items[0];

    for (let i = 1; i < count; i++) {
      if (cmp(items[i], result)) {
        result = items[i];
      }
    }

    return result;
  };
}
