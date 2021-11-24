// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { performance } from '../../test/performance';
import { isHex } from '.';

describe('isHex', (): void => {
  const test = '1234abcd';
  const ptest = '0x1234adbcdef5798351773526352876adbcdef2358735adbcdef2623587adbcdef11234adbcdef5798351773526352876adbcdef2358735adbcdef2623587adbcdef11234adbcdef5798351773526352876adbcdef2358735adbcdef2623587adbcdef11234adbcdef5798351773526352876adbcdef2358735adbcdef2623587adbcdef1';

  it('returns true on 0x hex values', (): void => {
    expect(
      isHex('0x')
    ).toEqual(true);
  });

  it('returns true on hex values', (): void => {
    expect(
      isHex(`0x${test}`)
    ).toEqual(true);
  });

  it('returns true on hex values with String', (): void => {
    expect(
      isHex(String(`0x${test}`))
    ).toEqual(true);
  });

  it('returns false on hex values (non % 2)', (): void => {
    expect(
      isHex(`0x${test}0`)
    ).toEqual(false);
  });

  it('returns true on uppercase values', (): void => {
    expect(
      isHex(`0x${test.toUpperCase()}`)
    ).toEqual(true);
  });

  it('return false on hex values unprefixed', (): void => {
    expect(
      isHex(test)
    ).toEqual(false);
  });

  it('returns false on non-string values', (): void => {
    expect(
      isHex(false)
    ).toEqual(false);
  });

  it('returns true when valid hex and bitLength matches', (): void => {
    expect(
      isHex('0x1234', 16)
    ).toEqual(true);
  });

  it('returns true when valid hex and bitLength does not match', (): void => {
    expect(
      isHex('0x1234', 8)
    ).toEqual(false);
  });

  it('does ignore lengths as required', (): void => {
    expect(
      isHex('0x123')
    ).toEqual(false);
    expect(
      isHex('0x123', -1, true)
    ).toEqual(true);
  });

  performance('isHex (1024-bit)', 1000000, [[ptest]], isHex);
});
