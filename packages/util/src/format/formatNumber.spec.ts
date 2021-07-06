// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BN } from '../bn';
import { formatNumber } from '.';

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
