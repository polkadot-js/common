// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hexToBigInt } from './index.js';

describe('hexToBigInt', (): void => {
  it('converts prefixed hex values to BN', (): void => {
    expect(
      hexToBigInt('0x81')
    ).toEqual(0x81n);
  });

  it('converts null values to BN(0)', (): void => {
    expect(
      hexToBigInt(null)
    ).toEqual(0n);
  });

  it('converts 0x values to BN(0)', (): void => {
    expect(
      hexToBigInt('0x')
    ).toEqual(0n);
  });

  it('should convert with Big Endian by default', (): void => {
    expect(
      hexToBigInt('0x0100123456')
    ).toEqual(0x0100123456n);
  });

  it('converts 0x values to BN(0) (LE)', (): void => {
    expect(
      hexToBigInt('0x', { isLe: true })
    ).toEqual(0n);
  });

  it('converts little-endian', (): void => {
    expect(
      hexToBigInt('0x4500000000000000', { isLe: true })
    ).toEqual(69n);
  });

  it('handles negative numbers (LE)', (): void => {
    expect(
      hexToBigInt('0x2efb', { isLe: true, isNegative: true })
    ).toEqual(-1234n);
  });

  it('handles negative numbers (BE)', (): void => {
    expect(
      hexToBigInt('0xfb2e', { isLe: false, isNegative: true })
    ).toEqual(-1234n);
  });

  it('handles negative numbers (LE, 128)', (): void => {
    expect(
      hexToBigInt('0x00009c584c491ff2ffffffffffffffff', { isLe: true, isNegative: true })
    ).toEqual(-1000000000000000000n);
  });

  it('handles starting zeros correctly (BE)', (): void => {
    expect(
      hexToBigInt('0x0000000000000100', { isLe: false })
    ).toEqual(256n);
  });

  it('handles starting zeros correctly (LE)', (): void => {
    expect(
      hexToBigInt('0x0001000000000000', { isLe: true })
    ).toEqual(256n);
  });
});
