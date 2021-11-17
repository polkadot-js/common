// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { biMax } from '.';

describe('biMax', (): void => {
  it('finds maximum', (): void => {
    expect(
      biMax(1n, 2n, 3n)
    ).toEqual(3n);
  });

  it('finds maximum', (): void => {
    expect(
      biMax(2n, 3n, 1n)
    ).toEqual(3n);
  });

  it('returns a single item', (): void => {
    expect(
      biMax(1n)
    ).toEqual(1n);
  });

  it('fails when no items are available', (): void => {
    expect(
      () => biMax()
    ).toThrow(/Must provide one or more bigint arguments/);
  });
});
