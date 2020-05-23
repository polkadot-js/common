// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import { bnToBn } from '.';

describe('bnToBn', (): void => {
  it('converts null values to 0x00', (): void => {
    expect(
      bnToBn(null).toNumber()
    ).toEqual(0);
  });

  it('converts BN values to BN', (): void => {
    expect(
      bnToBn(new BN(128)).toNumber()
    ).toEqual(128);
  });

  it('converts BigInt values to BN', (): void => {
    expect(
      bnToBn(128821n).toNumber()
    ).toEqual(128821);
  });

  it('converts number values to BN', (): void => {
    expect(
      bnToBn(128).toNumber()
    ).toEqual(128);
  });

  it('converts string to BN', (): void => {
    expect(
      bnToBn('123').toNumber()
    ).toEqual(123);
  });

  it('converts hex to BN', (): void => {
    expect(
      bnToBn('0x0123').toNumber()
    ).toEqual(0x123);
  });

  it('converts Compact to BN', (): void => {
    expect(
      bnToBn({
        something: 'test',
        toBn: (): BN => new BN(1234)
      }).toNumber()
    ).toEqual(1234);
  });
});
