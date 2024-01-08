// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { TESTS } from '../bi/toU8a.spec.js';
import { perf } from '../test/index.js';
import { u8aToBn } from './index.js';

// test-cases are the same as in u8aToBigInt
describe('u8aToBn', (): void => {
  it('converts little-endian by default', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([0x12, 0x34])
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

  it('handles overflows correctly (little-endian)', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0]),
        { isLe: true }
      ).toNumber()
    ).toBe(256);
  });

  describe('length tests', (): void => {
    [true, false].forEach((isLe) => {
      for (let i = 1; i < 32; i++) {
        const tu8a = [0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78];
        const tstr = tu8a.map((n) => n.toString(16));

        it(`converts values with bitLength=${i * 8}, isLe=${isLe}`, (): void => {
          expect(
            u8aToBn(
              new Uint8Array(tu8a.slice(0, i)),
              { isLe }
            ).toString(16)
          ).toBe(
            isLe
              ? tstr.slice(0, i).reverse().join('')
              : tstr.slice(0, i).join('')
          );
        });
      }
    });
  });

  describe('conversion tests', (): void => {
    TESTS.forEach(([isLe, isNegative, numarr, strval], i): void => {
      it(`#${i}: creates ${strval} (bitLength=${numarr.length * 8}, isLe=${isLe}, isNegative=${isNegative})`, (): void => {
        expect(
          u8aToBn(
            new Uint8Array(numarr),
            { isLe, isNegative }
          ).toString()
        ).toBe(strval);
      });
    });
  });

  perf('u8aToBn (i32)', 750_000, [[new Uint8Array([0x9c, 0x9c, 0x9c, 0x9c])]], (v: Uint8Array) => u8aToBn(v, { isNegative: true }));
  perf('u8aToBn (u32)', 750_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c])]], u8aToBn);
  perf('u8aToBn (u64)', 750_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c])]], u8aToBn);
  perf('u8aToBn (u128)', 750_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c])]], u8aToBn);
});
