// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { BN, bnMin } from './index.js';

describe('bnMin', (): void => {
  it('finds BN minimum', (): void => {
    expect(
      bnMin(new BN(2), new BN(1), new BN(3))
    ).toEqual(new BN(1));
  });

  it('returns a single item', (): void => {
    expect(
      bnMin(new BN(1))
    ).toEqual(new BN(1));
  });

  it('fails when no items are available', (): void => {
    expect(
      () => bnMin()
    ).toThrow(/Must provide one or more arguments/);
  });
});
