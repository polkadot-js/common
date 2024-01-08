// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { nMin } from './index.js';

describe('nMin', (): void => {
  it('finds BN minimum', (): void => {
    expect(
      nMin(2n, 1n, 3n)
    ).toEqual(1n);
  });

  it('returns a single item', (): void => {
    expect(
      nMin(1n)
    ).toEqual(1n);
  });

  it('fails when no items are available', (): void => {
    expect(
      () => nMin()
    ).toThrow(/Must provide one or more arguments/);
  });
});
