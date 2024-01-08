// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { BN } from '../bn/index.js';
import { nToBigInt } from './index.js';

describe('nToBigInt', (): void => {
  it('converts null values to 0x00', (): void => {
    expect(
      nToBigInt(null)
    ).toEqual(0n);
  });

  it('converts 0x values to 0x00', (): void => {
    expect(
      nToBigInt('0x')
    ).toEqual(0n);
  });

  it('converts BN values to bigint', (): void => {
    expect(
      nToBigInt(new BN(128))
    ).toEqual(128n);
  });

  it('converts BigInt values to bigint', (): void => {
    expect(
      nToBigInt(128821n)
    ).toEqual(128821n);
  });

  it('converts number values to bigint', (): void => {
    expect(
      nToBigInt(128)
    ).toEqual(128n);
  });

  it('converts string to bigint', (): void => {
    expect(
      nToBigInt('123')
    ).toEqual(123n);
  });

  it('converts hex to bigint', (): void => {
    expect(
      nToBigInt('0x0123')
    ).toEqual(0x123n);
  });

  it('converts Compact to bigint (via toBn)', (): void => {
    expect(
      nToBigInt({
        something: 'test',
        toBn: () => new BN(1234)
      })
    ).toEqual(1234n);
  });

  it('converts Compact to bigint (via toBigInt)', (): void => {
    expect(
      nToBigInt({
        something: 'test',
        toBigInt: () => 1234n
      })
    ).toEqual(1234n);
  });
});
