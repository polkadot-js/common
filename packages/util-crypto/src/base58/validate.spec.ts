// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { base58Validate } from './index.js';

describe('base58Validate', (): void => {
  it('validates encoded', (): void => {
    expect(
      base58Validate('a1UbyspTdnyZXLUQaQbciCxrCWWxz24kgSwGXSQnkbs', false)
    ).toEqual(true);
  });

  it('fails on string with extra padding', (): void => {
    expect(
      () => base58Validate('a1UbyspTdnyZXLUQaQbciCxrCWWxz24kgSwGXSQnkbs=', false)
    ).toThrow(/Invalid base58 character "="/);
  });
});
