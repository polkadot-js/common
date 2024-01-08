// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { BN, BN_HUNDRED, BN_ONE, BN_TEN, BN_THOUSAND, BN_ZERO } from './index.js';

describe('consts', (): void => {
  it('BN_ZERO equals 0', (): void => {
    expect(
      BN_ZERO
    ).toEqual(new BN(0));
  });

  it('BN_ONE equals 1', (): void => {
    expect(
      BN_ONE
    ).toEqual(new BN(1));
  });

  it('BN_TEN equals 10', (): void => {
    expect(
      BN_TEN
    ).toEqual(new BN(10));
  });

  it('BN_HUNDRED equals 100', (): void => {
    expect(
      BN_HUNDRED
    ).toEqual(new BN(100));
  });

  it('BN_THOUSAND equals 1000', (): void => {
    expect(
      BN_THOUSAND
    ).toEqual(new BN(1000));
  });
});
