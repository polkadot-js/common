// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isBigInt } from '.';

describe('isBigInt', (): void => {
  it('returns true when a BigInt value', (): void => {
    expect(
      isBigInt(123456n)
    ).toEqual(true);
  });

  it('returns true when a BigInt value', (): void => {
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
