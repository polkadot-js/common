// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hexToBn } from './index.js';

describe('hexToBn', (): void => {
  it('converts prefixed hex values to BN', (): void => {
    expect(
      hexToBn('0x81').toString(16)
    ).toBe('81');
  });

  it('converts null values to BN(0)', (): void => {
    expect(
      hexToBn(null).toNumber()
    ).toBe(0);
  });

  it('converts 0x values to BN(0)', (): void => {
    expect(
      hexToBn('0x').toNumber()
    ).toBe(0);
  });

  it('should convert with Big Endian by default', (): void => {
    expect(
      hexToBn('0x0100').toNumber()
    ).toBe(256);
  });

  it('converts 0x values to BN(0) (LE)', (): void => {
    expect(
      hexToBn('0x', { isLe: true }).toNumber()
    ).toBe(0);
  });

  it('converts little-endian', (): void => {
    expect(
      hexToBn('0x4500000000000000', { isLe: true }).toNumber()
    ).toBe(69);
  });

  it('handles negative numbers (LE)', (): void => {
    expect(
      hexToBn('0x2efb', { isLe: true, isNegative: true }).toNumber()
    ).toBe(-1234);
  });

  it('handles negative numbers (BE)', (): void => {
    expect(
      hexToBn('0xfb2e', { isLe: false, isNegative: true }).toNumber()
    ).toBe(-1234);
  });

  it('handles negative numbers (LE, 128)', (): void => {
    expect(
      hexToBn('0x00009c584c491ff2ffffffffffffffff', { isLe: true, isNegative: true }).toString()
    ).toEqual('-1000000000000000000');
  });

  it('handles starting zeros correctly (BE)', (): void => {
    expect(
      hexToBn('0x0000000000000100', { isLe: false }).toNumber()
    ).toBe(256);
  });

  it('handles starting zeros correctly (LE)', (): void => {
    expect(
      hexToBn('0x0001000000000000', { isLe: true }).toNumber()
    ).toBe(256);
  });
});
