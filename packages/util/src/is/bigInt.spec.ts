// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isBigInt } from './index.js';

describe('isBigInt', (): void => {
  it('returns true with a ...n value', (): void => {
    expect(
      isBigInt(123456n)
    ).toEqual(true);
  });

  it('returns true with a BigInt(...) value', (): void => {
    expect(
      isBigInt(BigInt(123456))
    ).toEqual(true);
  });

  it('returns false on non-BigInt values', (): void => {
    expect(
      isBigInt(0)
    ).toEqual(false);
  });
});
