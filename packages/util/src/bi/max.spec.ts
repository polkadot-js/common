// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { nMax } from '.';

describe('nMax', (): void => {
  it('finds maximum', (): void => {
    expect(
      nMax(1n, 2n, 3n)
    ).toEqual(3n);
  });

  it('finds maximum', (): void => {
    expect(
      nMax(2n, 3n, 1n)
    ).toEqual(3n);
  });

  it('returns a single item', (): void => {
    expect(
      nMax(1n)
    ).toEqual(1n);
  });

  it('fails when no items are available', (): void => {
    expect(
      () => nMax()
    ).toThrow(/Must provide one or more bigint arguments/);
  });
});
