// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { SQRT_TESTS } from '../bi/sqrt.spec.js';
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

  SQRT_TESTS.forEach(([value, expected], index): void => {
    it(`calcs for test #${index}`, (): void => {
      expect(
        bnSqrt(value).eq(new BN(expected))
      ).toEqual(true);
    });
  });
});
