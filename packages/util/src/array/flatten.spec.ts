// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayFlatten } from '.';

describe('arrayFlatten', (): void => {
  it('flattens arrays', (): void => {
    expect(
      arrayFlatten([[0], [1, 2, 3], [4, 5], [6], [], [7, 8]])
    ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
