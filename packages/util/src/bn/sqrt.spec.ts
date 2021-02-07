// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { bnSqrt } from '.';

describe('bnSqrt', (): void => {
  it('fails on < 0 roots', (): void => {
    expect(
      () => bnSqrt(new BN(-1))
    ).toThrow(/negative numbers is not supported/);
  });

  it('finds the sqrt (exact, small)', (): void => {
    expect(
      bnSqrt(new BN(4)).eq(new BN(2))
    ).toEqual(true);
  });

  it('finds the sqrt (exact)', (): void => {
    expect(
      bnSqrt(new BN(256 * 256)).eq(new BN(256))
    ).toEqual(true);
  });

  it('finds the sqrt (exact, very large)', (): void => {
    expect(
      bnSqrt(new BN(
        '82120471531550314555681345949499512621827274120673745141541602816614526075010755373654280259022317599142038423759320355177481886719814621305828811322920076213800348341464996337890625'
      )).eq(new BN(
        '9062034624274524065844376014975805577107171799890766992670739972241112960081909332275390625'
      ))
    ).toEqual(true);
  });

  it('finds the sqrt (max safe int)', (): void => {
    expect(
      bnSqrt(new BN(Number.MAX_SAFE_INTEGER)).toNumber()
    ).toEqual(94906265);
  });

  it('finds the sqrt (round)', (): void => {
    expect(
      bnSqrt(new BN(16 * 16 + 10)).eq(new BN(16))
    ).toEqual(true);
  });

  it('finds the sqrt (round, larger)', (): void => {
    expect(
      bnSqrt(new BN(12345678).imuln(12345679)).eq(new BN(12345678))
    ).toEqual(true);
  });

  it('find the sqrt for 1', (): void => {
    expect(
      bnSqrt(new BN(1)).eq(new BN(1))
    ).toEqual(true);
  });

  it('find the sqrt for 0', (): void => {
    expect(
      bnSqrt(new BN(0)).eq(new BN(0))
    ).toEqual(true);
  });
});
