// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { biToHex } from '.';

describe('biToHex', (): void => {
  it('converts null values to 0x00', (): void => {
    expect(
      biToHex(null)
    ).toBe('0x00');
  });

  it('converts values to a prefixed hex representation', (): void => {
    expect(
      biToHex(128)
    ).toBe('0x80');
  });

  it('converts values to a prefixed hex representation (bitLength)', (): void => {
    expect(
      biToHex(128n, { bitLength: 16 })
    ).toBe('0x0080');
  });

  it('converts values to a prefixed hex representation (bitLength + le)', (): void => {
    expect(
      biToHex(128, { bitLength: 16, isLe: true })
    ).toBe('0x8000');
  });

  it('converts values to a prefixed hex representation (LE)', (): void => {
    expect(
      biToHex(128, { bitLength: 16, isLe: true })
    ).toBe('0x8000');
  });

  it('handles negative numbers', (): void => {
    expect(
      biToHex(-1234, { isNegative: true })
    ).toBe('0xfb2e');
  });

  it('handles negative numbers (with bitLength)', (): void => {
    expect(
      biToHex(-1234, { bitLength: 32, isNegative: true })
    ).toBe('0xfffffb2e');
  });
});
