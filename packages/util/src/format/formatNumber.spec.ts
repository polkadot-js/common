// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import formatNumber from './formatNumber';

describe('formatNumber', (): void => {
  it('formats empty', (): void => {
    expect(
      formatNumber()
    ).toEqual('0');
  });

  it('formats negative numbers', (): void => {
    expect(
      formatNumber(-123456)
    ).toEqual('-123,456');
  });

  it('formats BN numbers', (): void => {
    expect(
      formatNumber(new BN(12345))
    ).toEqual('12,345');
  });

  it('formats BigInt numbers', (): void => {
    expect(
      formatNumber(123456789n)
    ).toEqual('123,456,789');
  });

  it('formats Compact<BN>', (): void => {
    expect(
      formatNumber({
        toBn: (): BN => new BN(12345),
        unwrap: (): BN => new BN(0)
      })
    ).toEqual('12,345');
  });
});
