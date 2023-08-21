// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { u8aToBigInt } from './index.js';

// test-cases are the same as in u8aToBn
describe('u8aToBigInt', (): void => {
  it('converts little-endian by default', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array([0x12, 0x34])
      ).toString(16)
    ).toBe('3412');
  });

  describe('LE', (): void => {
    describe('unsigned', (): void => {
      it('converts values (u8)', (): void => {
        expect(
          u8aToBigInt(
            new Uint8Array([0x12]),
            { isLe: true }
          ).toString(16)
        ).toBe('12');
      });

      it('converts values (u16)', (): void => {
        expect(
          u8aToBigInt(
            new Uint8Array([0x12, 0x34]),
            { isLe: true }
          ).toString(16)
        ).toBe('3412');
      });

      it('converts values (u24)', (): void => {
        expect(
          u8aToBigInt(
            new Uint8Array([0x12, 0x34, 0x56]),
            { isLe: true }
          ).toString(16)
        ).toBe('563412');
      });

      it('converts values (u32)', (): void => {
        expect(
          u8aToBigInt(
            new Uint8Array([0x12, 0x34, 0x56, 0x78]),
            { isLe: true }
          ).toString(16)
        ).toBe('78563412');
      });

      it('converts values (i32)', (): void => {
        expect(
          u8aToBigInt(
            new Uint8Array([0xf2, 0x34, 0x56, 0x78]),
            { isLe: false, isNegative: true }
          ).toString(16)
        ).toBe('-dcba988');
      });

      it('converts values (u40)', (): void => {
        expect(
          u8aToBigInt(
            new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a]),
            { isLe: true }
          ).toString(16)
        ).toBe('9a78563412');
      });

      it('converts values (u48)', (): void => {
        expect(
          u8aToBigInt(
            new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc]),
            { isLe: true }
          ).toString(16)
        ).toBe('bc9a78563412');
      });

      it('converts values (u128)', (): void => {
        expect(
          u8aToBigInt(
            new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78]),
            { isLe: true }
          ).toString(16)
        ).toBe('78563412785634127856341278563412');
      });

      for (let i = 1; i < 32; i++) {
        const tu8a = [0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78];
        const tstr = tu8a.map((n) => n.toString(16));

        it(`converts values with length ${i}`, (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array(tu8a.slice(0, i)),
              { isLe: true }
            ).toString(16)
          ).toBe(tstr.slice(0, i).reverse().join(''));
        });
      }
    });

    describe('signed', (): void => {
      describe('positive values', (): void => {
        it('converts positive numbers (i8)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([12]),
              { isNegative: true }
            ).toString()
          ).toBe('12');
        });

        it('converts positive numbers (i16)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([210, 4]),
              { isNegative: true }
            ).toString()
          ).toBe('1234');
        });

        it('converts positive numbers (i24)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([64, 226, 1]),
              { isNegative: true }
            ).toString()
          ).toBe('123456');
        });

        it('converts positive numbers (i32)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([21, 205, 91, 7]),
              { isNegative: true }
            ).toString()
          ).toBe('123456789');
        });

        it('converts positive numbers (i40)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([203, 36, 104, 12, 8]),
              { isNegative: true }
            ).toString()
          ).toBe('34567890123');
        });

        it('converts positive numbers (i48)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([255, 159, 114, 78, 24, 9]),
              { isNegative: true }
            ).toString()
          ).toBe('9999999999999');
        });
      });

      describe('negative values', (): void => {
        it('converts values (i8)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([244]),
              { isLe: true, isNegative: true }
            ).toString()
          ).toBe('-12');
        });

        it('converts values (i16)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([46, 251]),
              { isLe: true, isNegative: true }
            ).toString()
          ).toBe('-1234');
        });

        it('converts values (i24)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([192, 29, 254]),
              { isLe: true, isNegative: true }
            ).toString()
          ).toBe('-123456');
        });

        it('converts values (i32)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([235, 50, 164, 248]),
              { isLe: true, isNegative: true }
            ).toString()
          ).toBe('-123456789');
        });

        it('converts values (i40)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([65, 86, 129, 173, 254]),
              { isLe: true, isNegative: true }
            ).toString()
          ).toBe('-5678999999');
        });

        it('converts values (i48)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([1, 96, 141, 177, 231, 246]),
              { isLe: true, isNegative: true }
            ).toString()
          ).toBe('-9999999999999');
        });

        it('converts values (i64)', (): void => {
          expect(
            u8aToBigInt(
              new Uint8Array([1, 0, 156, 88, 76, 73, 31, 242]),
              { isLe: true, isNegative: true }
            ).toString()
          ).toBe('-999999999999999999');
        });
      });
    });
  });

  describe('BE', (): void => {
    it('converts values (u8)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array([0x12]),
          { isLe: false }
        ).toString(16)
      ).toBe('12');
    });

    it('converts values (u16)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array([0x12, 0x34]),
          { isLe: false }
        ).toString(16)
      ).toBe('1234');
    });

    it('converts values (u24)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array([0x12, 0x34, 0x56]),
          { isLe: false }
        ).toString(16)
      ).toBe('123456');
    });

    it('converts values (u32)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array([0x12, 0x34, 0x56, 0x78]),
          { isLe: false }
        ).toString(16)
      ).toBe('12345678');
    });

    it('converts values (u40)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a]),
          { isLe: false }
        ).toString(16)
      ).toBe('123456789a');
    });

    it('converts values (u48)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc]),
          { isLe: false }
        ).toString(16)
      ).toBe('123456789abc');
    });

    it('converts values (u128)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array([0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78]),
          { isLe: false }
        ).toString(16)
      ).toBe('12345678123456781234567812345678');
    });

    for (let i = 1; i < 32; i++) {
      const tu8a = [0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78];
      const tstr = tu8a.map((n) => n.toString(16));

      it(`converts values with length ${i}`, (): void => {
        expect(
          u8aToBigInt(
            new Uint8Array(tu8a.slice(0, i)),
            { isLe: false }
          ).toString(16)
        ).toBe(tstr.slice(0, i).join(''));
      });
    }
  });

  describe('empty creation', (): void => {
    it('handles unsigned (le)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array(),
          { isLe: true }
        ).toString(16)
      ).toBe('0');
    });

    it('handles signed (le)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array(),
          { isLe: true, isNegative: true }
        ).toString(16)
      ).toBe('0');
    });

    it('handles unsigned (be)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array(),
          { isLe: false }
        ).toString(16)
      ).toBe('0');
    });

    it('handles signed (be)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array(),
          { isLe: false, isNegative: true }
        ).toString(16)
      ).toBe('0');
    });
  });

  describe('negative', (): void => {
    it('handles negative numbers (little-endian)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array([46, 251]),
          { isLe: true, isNegative: true }
        )
      ).toBe(-1234n);
    });

    it('handles negative numbers (big-endian)', (): void => {
      expect(
        u8aToBigInt(
          new Uint8Array([251, 46]),
          { isLe: false, isNegative: true }
        )
      ).toBe(-1234n);
    });
  });

  it('handles overflows correctly (little-endian)', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0]),
        { isLe: true }
      )
    ).toBe(256n);
  });

  perf('u8aToBigInt (i32)', 750_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c])]], (v: Uint8Array) => u8aToBigInt(v, { isNegative: true }));

  perf('u8aToBigInt (u32)', 750_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c])]], u8aToBigInt);
  perf('u8aToBigInt (u64)', 750_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c])]], u8aToBigInt);
  perf('u8aToBigInt (u128)', 750_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c])]], u8aToBigInt);

  // perf('BigInt (constructor)', 1_000_000, [[12345678]], (v: number) => BigInt(v).toString());
  // perf('BigInt (constructor -> string)', 1_000_000, [[12345678]], (v: number) => BigInt(v).toString());
});
