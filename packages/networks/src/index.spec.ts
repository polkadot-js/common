// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NetworkFromSubstrate } from './types';

import filtered, { all, available } from '.';

describe('filtered', (): void => {
  it('has the correct starting order', (): void => {
    expect(filtered.slice(0, 3).map(({ prefix }) => prefix)).toEqual([0, 2, 42]);
  });

  it('has no ignored networks', (): void => {
    expect(available.some(({ isIgnored }) => isIgnored)).toEqual(false);
  });

  it('has no reserved networks', (): void => {
    expect(available.some(({ prefix }) => prefix === 47)).toEqual(false);
  });

  it('has no ss58 duplicates', (): void => {
    const dupes: NetworkFromSubstrate[] = [];
    const uniques: NetworkFromSubstrate[] = [];

    all.forEach((a): void => {
      if (uniques.some((u) => u.prefix === a.prefix)) {
        dupes.push(a);
      } else {
        uniques.push(a);
      }
    });

    expect(dupes).toEqual([]);
  });
});
