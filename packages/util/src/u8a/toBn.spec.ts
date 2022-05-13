// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { performance } from '../test/performance';
import { u8aToBn } from '.';

describe('u8aToBn', (): void => {
  it('supports legacy compatibility', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([0x12, 0x34]),
        true
      ).toString(16)
    ).toBe('3412');
    expect(
      u8aToBn(
        new Uint8Array([0x12, 0x34]),
        false
      ).toString(16)
    ).toBe('1234');
  });

  it('converts little-endian by default', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([0x12, 0x34])
      ).toString(16)
    ).toBe('3412');
  });

  it('converts values (big-endian)', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([0x12, 0x34]),
        { isLe: false }
      ).toString(16)
    ).toBe('1234');
  });

  it('converts values (little-endian)', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([0x12, 0x34]),
        { isLe: true }
      ).toString(16)
    ).toBe('3412');
  });

  describe('empty creation', (): void => {
    it('handles unsigned (le)', (): void => {
      expect(
        u8aToBn(
          new Uint8Array(),
          { isLe: true }
        ).toString(16)
      ).toBe('0');
    });

    it('handles signed (le)', (): void => {
      expect(
        u8aToBn(
          new Uint8Array(),
          { isLe: true, isNegative: true }
        ).toString(16)
      ).toBe('0');
    });

    it('handles unsigned (be)', (): void => {
      expect(
        u8aToBn(
          new Uint8Array(),
          { isLe: false }
        ).toString(16)
      ).toBe('0');
    });

    it('handles signed (be)', (): void => {
      expect(
        u8aToBn(
          new Uint8Array(),
          { isLe: false, isNegative: true }
        ).toString(16)
      ).toBe('0');
    });
  });

  it('handles negative numbers (little-endian)', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([46, 251]),
        { isLe: true, isNegative: true }
      ).toNumber()
    ).toBe(-1234);
  });

  it('handles negative numbers (big-endian)', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([251, 46]),
        { isLe: false, isNegative: true }
      ).toNumber()
    ).toBe(-1234);
  });

  it('handles overflows correctly (little-endian)', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0]),
        { isLe: true }
      ).toNumber()
    ).toBe(256);
  });

  it('handles backward compatibility)', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0]),
        false
      ).eq(
        u8aToBn(
          new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0]),
          { isLe: false }
        )
      )
    ).toBe(true);
    expect(
      u8aToBn(
        new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0]),
        true
      ).eq(
        u8aToBn(
          new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0]),
          { isLe: true }
        )
      )
    ).toBe(true);
  });

  performance('u8aToBn', 500000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c])]], u8aToBn);
});
