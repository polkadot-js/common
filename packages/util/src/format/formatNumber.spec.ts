// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Compact } from './types';

import BN from 'bn.js';

import formatNumber from './formatNumber';

describe('formatNumber', () => {
  it('formats empty', () => {
    expect(
      formatNumber()
    ).toEqual('0');
  });

  it('formats negative numbers', () => {
    expect(
      formatNumber(-123456)
    ).toEqual('-123,456');
  });

  it('formats BN numbers', () => {
    expect(
      formatNumber(new BN(12345))
    ).toEqual('12,345');
  });

  it('formats Compact<BN>', () => {
    expect(
      formatNumber({ toBn: () => new BN(12345) } as Compact)
    ).toEqual('12,345');
  });
});
