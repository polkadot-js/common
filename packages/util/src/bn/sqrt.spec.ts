// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { TESTS } from '../bi/sqrt.spec.js';
import { BN, BN_SQRT_MAX_INTEGER, bnSqrt } from './index.js';

describe('bnSqrt', (): void => {
  it('fails on < 0 roots', (): void => {
    expect(
      () => bnSqrt(new BN(-1))
    ).toThrow(/negative numbers is not supported/);
  });

  it('has the correct constant for sqrt(Number.MAX_SAFE_INTEGER)', (): void => {
    expect(
      BN_SQRT_MAX_INTEGER.eq(
        new BN(
          ~~Math.sqrt(
            Number.MAX_SAFE_INTEGER
          )
        )
      )
    ).toEqual(true);
  });

  describe('conversion tests', (): void => {
    TESTS.forEach(([value, expected], i): void => {
      it(`#${i}: calcs ${expected}`, (): void => {
        expect(
          bnSqrt(value).eq(new BN(expected))
        ).toEqual(true);
      });
    });
  });
});
