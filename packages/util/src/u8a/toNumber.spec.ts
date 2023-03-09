// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { perf } from '../test/index.js';
import { u8aToNumber } from './index.js';

describe('u8aToNumber', (): void => {
  describe('unsigned', (): void => {
    it('converts values (u8)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array([0x12])
        )
      ).toBe(18);
    });

    it('converts values (u16)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array([0x12, 0x34])
        )
      ).toBe(13330);
    });

    it('converts values (u24)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array([0x12, 0x34, 0x56])
        )
      ).toBe(5649426);
    });

    it('converts values (u32)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array([0x12, 0x34, 0x56, 0x78])
        )
      ).toBe(2018915346);
    });

    it('converts values (u40)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a])
        )
      ).toBe(663443878930);
    });

    it('converts values (u48)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc])
        )
      ).toBe(207371629900818);
    });
  });

  describe('signed', (): void => {
    it('converts values (i8)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array([244]),
          { isNegative: true }
        )
      ).toBe(-12);
    });

    it('converts values (i16)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array([46, 251]),
          { isNegative: true }
        )
      ).toBe(-1234);
    });

    it('converts values (i24)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array([192, 29, 254]),
          { isNegative: true }
        )
      ).toBe(-123456);
    });

    it('converts values (i32)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array([235, 50, 164, 248]),
          { isNegative: true }
        )
      ).toBe(-123456789);
    });

    it('converts values (i40)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array([65, 86, 129, 173, 254]),
          { isNegative: true }
        )
      ).toBe(-5678999999);
    });

    it('converts values (i48)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array([1, 96, 141, 177, 231, 246]),
          { isNegative: true }
        )
      ).toBe(-9999999999999);
    });
  });

  describe('empty creation', (): void => {
    it('handles unsigned (le)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array()
        )
      ).toBe(0);
    });

    it('handles signed (le)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array(),
          { isNegative: true }
        )
      ).toBe(0);
    });
  });

  perf('u8aToNumber (u32)', 1_000_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c])]], u8aToNumber);
  perf('u8aToNumber (i32)', 1_000_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c])]], (v: Uint8Array) => u8aToNumber(v, { isNegative: true }));
});
