// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { nMax } from './index.js';

describe('nMax', (): void => {
  it('finds maximum (sorted)', (): void => {
    expect(
      nMax(1n, 2n, 3n)
    ).toEqual(3n);
  });

  it('finds maximum (unsorted)', (): void => {
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
    ).toThrow(/Must provide one or more arguments/);
  });
});
