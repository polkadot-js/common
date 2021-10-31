// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BN, bnMax } from '.';

describe('bnMax', (): void => {
  it('finds BN maximum', (): void => {
    expect(
      bnMax(new BN(1), new BN(2), new BN(3))
    ).toEqual(new BN(3));
  });

  it('finds BN maximum', (): void => {
    expect(
      bnMax(new BN(2), new BN(3), new BN(1))
    ).toEqual(new BN(3));
  });
});
