// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { biMin } from '.';

describe('biMin', (): void => {
  it('finds BN minimum', (): void => {
    expect(
      biMin(2n, 1n, 3n)
    ).toEqual(1n);
  });

  it('returns a single item', (): void => {
    expect(
      biMin(1n)
    ).toEqual(1n);
  });

  it('fails when no items are available', (): void => {
    expect(
      () => biMin()
    ).toThrow(/Must provide one or more bigint arguments/);
  });
});
