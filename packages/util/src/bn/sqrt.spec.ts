// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import { bnSqrt } from '.';

describe('bnSqrt', (): void => {
  it('finds the sqrt (exact)', (): void => {
    expect(
      bnSqrt(new BN(256).mul(new BN(256)))
    ).toEqual(new BN(256));
  });

  it('finds the sqrt (round)', (): void => {
    expect(
      bnSqrt(new BN(266))
    ).toEqual(new BN(16));
  });
});
