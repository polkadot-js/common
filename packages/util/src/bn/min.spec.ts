// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import { bnMin } from '.';

describe('bnMin', () => {
  it('finds BN minimum', () => {
    expect(
      bnMin(new BN(1), new BN(2), new BN(3))
    ).toEqual(new BN(1));
  });
});
