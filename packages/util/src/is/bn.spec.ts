// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import { isBn } from '.';

describe('isBN', (): void => {
  it('returns true when a BN value', (): void => {
    expect(
      isBn(new BN(123))
    ).toEqual(true);
  });

  it('returns false on non-BN values', (): void => {
    expect(
      isBn(0)
    ).toEqual(false);
  });
});
