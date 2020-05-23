// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
