// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToBigInt } from '.';

describe('u8aToBigInt', (): void => {
  it('converts little-endian by default', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array([0x12, 0x34])
      )
    ).toEqual(0x3412n);
  });

  it('converts values (big-endian)', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array([0x12, 0x34]),
        { isLe: false }
      )
    ).toEqual(0x1234n);
  });

  it('converts values (little-endian)', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array([0x12, 0x34, 0x56]),
        { isLe: true }
      )
    ).toEqual(0x563412n);
  });

  it('converts empty', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array(),
        { isLe: true }
      )
    ).toEqual(0n);
  });

  it('handles negative numbers (little-endian)', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array([46, 251]),
        { isLe: true, isNegative: true }
      )
    ).toEqual(-1234n);
  });

  it('handles negative numbers (big-endian)', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array([251, 46]),
        { isLe: false, isNegative: true }
      )
    ).toEqual(-1234n);
  });
});
