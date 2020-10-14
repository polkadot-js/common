// Copyright 2017-2020 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import filtered from './';

describe('filtered', (): void => {
  it('has the correct starting order', (): void => {
    expect(filtered.slice(0, 3).map(({ prefix }) => prefix)).toEqual([0, 2, 42]);
  });
});
