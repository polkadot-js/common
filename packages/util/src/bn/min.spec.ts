// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { bnMin } from '.';

describe('bnMin', (): void => {
  it('finds BN minimum', (): void => {
    expect(
      bnMin(new BN(1), new BN(2), new BN(3))
    ).toEqual(new BN(1));
  });
});
