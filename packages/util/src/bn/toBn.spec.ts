// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { BN, bnToBn } from './index.js';

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
