// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { biToBigInt } from '.';

describe('biToBigInt', (): void => {
  it('converts null values to 0x00', (): void => {
    expect(
      biToBigInt(null).toNumber()
    ).toEqual(0);
  });

  it('converts BN values to BN', (): void => {
    expect(
      biToBigInt(new BN(128)).toNumber()
    ).toEqual(128);
  });

  it('converts BigInt values to BN', (): void => {
    expect(
      biToBigInt(128821n).toNumber()
    ).toEqual(128821);
  });

  it('converts number values to BN', (): void => {
    expect(
      biToBigInt(128).toNumber()
    ).toEqual(128);
  });

  it('converts string to BN', (): void => {
    expect(
      biToBigInt('123').toNumber()
    ).toEqual(123);
  });

  it('converts hex to BN', (): void => {
    expect(
      biToBigInt('0x0123').toNumber()
    ).toEqual(0x123);
  });

  it('converts Compact to BN', (): void => {
    expect(
      biToBigInt({
        something: 'test',
        toBn: (): BN => new BN(1234)
      }).toNumber()
    ).toEqual(1234);
  });
});
