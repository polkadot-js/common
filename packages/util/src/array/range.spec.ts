// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayRange } from '.';

describe('arrayRange', (): void => {
  it('does not allow 0 values', (): void => {
    expect(
      () => arrayRange(0)
    ).toThrow(/Expected non-zero, positive number as a range size/);
  });

  it('it creates a range of the specified length', (): void => {
    expect(
      arrayRange(10)
    ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('it creates a range of the specified length, with offset', (): void => {
    expect(
      arrayRange(7, 3)
    ).toEqual([3, 4, 5, 6, 7, 8, 9]);
  });
});
