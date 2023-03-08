// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { perf } from '../test/index.js';
import { u8aToBn } from './index.js';

describe('u8aToBn', (): void => {
  it('converts little-endian by default', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([0x12, 0x34])
      ).toString(16)
    ).toBe('3412');
  });

  describe('LE', (): void => {
    describe('unsigned', (): void => {
      it('converts values (u8)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([0x12]),
            { isLe: true }
          ).toString(16)
        ).toBe('12');
      });

      it('converts values (u16)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([0x12, 0x34]),
            { isLe: true }
          ).toString(16)
        ).toBe('3412');
      });

      it('converts values (u24)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([0x12, 0x34, 0x56]),
            { isLe: true }
          ).toString(16)
        ).toBe('563412');
      });

      it('converts values (u32)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([0x12, 0x34, 0x56, 0x78]),
            { isLe: true }
          ).toString(16)
        ).toBe('78563412');
      });

      it('converts values (u40)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a]),
            { isLe: true }
          ).toString(16)
        ).toBe('9a78563412');
      });

      it('converts values (u48)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc]),
            { isLe: true }
          ).toString(16)
        ).toBe('bc9a78563412');
      });
    });

    describe('signed', (): void => {
      it('converts values (i8)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([244]),
            { isLe: true, isNegative: true }
          ).toString()
        ).toBe('-12');
      });

      it('converts values (i16)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([46, 251]),
            { isLe: true, isNegative: true }
          ).toString()
        ).toBe('-1234');
      });

      it('converts values (i24)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([192, 29, 254]),
            { isLe: true, isNegative: true }
          ).toString()
        ).toBe('-123456');
      });

      it('converts values (i32)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([235, 50, 164, 248]),
            { isLe: true, isNegative: true }
          ).toString()
        ).toBe('-123456789');
      });

      it('converts values (i40)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([65, 86, 129, 173, 254]),
            { isLe: true, isNegative: true }
          ).toString()
        ).toBe('-5678999999');
      });

      it('converts values (i48)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([1, 96, 141, 177, 231, 246]),
            { isLe: true, isNegative: true }
          ).toString()
        ).toBe('-9999999999999');
      });

      it('converts values (i64)', (): void => {
        expect(
          u8aToBn(
            new Uint8Array([1, 0, 156, 88, 76, 73, 31, 242]),
            { isLe: true, isNegative: true }
          ).toString()
        ).toBe('-999999999999999999');
      });
    });
  });

  describe('BE', (): void => {
    it('converts values (u8)', (): void => {
      expect(
        u8aToBn(
          new Uint8Array([0x12]),
          { isLe: false }
        ).toString(16)
      ).toBe('12');
    });

    it('converts values (u16)', (): void => {
      expect(
        u8aToBn(
          new Uint8Array([0x12, 0x34]),
          { isLe: false }
        ).toString(16)
      ).toBe('1234');
    });

    it('converts values (u24)', (): void => {
      expect(
        u8aToBn(
          new Uint8Array([0x12, 0x34, 0x56]),
          { isLe: false }
        ).toString(16)
      ).toBe('123456');
    });

    it('converts values (u32)', (): void => {
      expect(
        u8aToBn(
          new Uint8Array([0x12, 0x34, 0x56, 0x78]),
          { isLe: false }
        ).toString(16)
      ).toBe('12345678');
    });

    it('converts values (u40)', (): void => {
      expect(
        u8aToBn(
          new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a]),
          { isLe: false }
        ).toString(16)
      ).toBe('123456789a');
    });

    it('converts values (u48)', (): void => {
      expect(
        u8aToBn(
          new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc]),
          { isLe: false }
        ).toString(16)
      ).toBe('123456789abc');
    });
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

  describe('negative', (): void => {
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
  });

  it('handles overflows correctly (little-endian)', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0]),
        { isLe: true }
      ).toNumber()
    ).toBe(256);
  });

  perf('u8aToBn (u32)', 1_000_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c])]], u8aToBn);
  perf('u8aToBn (i32)', 1_000_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c])]], (v: Uint8Array) => u8aToBn(v, { isNegative: true }));
  perf('u8aToBn (u64)', 500_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c])]], u8aToBn);
});
