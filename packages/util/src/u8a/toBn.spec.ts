// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { u8aToBn } from './index.js';

// eslint-disable-next-line jest/no-export
export const TESTS: [isLe: boolean, isNegative: boolean, numarr: number[], strval: string][] = [
  // LE, positive numbers
  [true, false, [0x12], '18'],
  [true, false, [0x12, 0x34], '13330'],
  [true, false, [0x12, 0x34, 0x56], '5649426'],
  [true, false, [0x12, 0x34, 0x56, 0x78], '2018915346'],
  [true, false, [0x12, 0x34, 0x56, 0x78, 0x9a], '663443878930'],
  [true, false, [0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc], '207371629900818'],
  [true, false, [0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78], '159954953172672629770948536149615195154'],
  // LE, positivive numbers (w/ signed flag)
  [true, true, [12], '12'],
  [true, true, [210, 4], '1234'],
  [true, true, [64, 226, 1], '123456'],
  [true, true, [21, 205, 91, 7], '123456789'],
  [true, true, [203, 36, 104, 12, 8], '34567890123'],
  [true, true, [255, 159, 114, 78, 24, 9], '9999999999999'],
  // LE, negative numbers
  [true, true, [244], '-12'],
  [true, true, [46, 251], '-1234'],
  [true, true, [192, 29, 254], '-123456'],
  [true, true, [235, 50, 164, 248], '-123456789'],
  [true, true, [65, 86, 129, 173, 254], '-5678999999'],
  [true, true, [1, 96, 141, 177, 231, 246], '-9999999999999'],
  [true, true, [1, 0, 156, 88, 76, 73, 31, 242], '-999999999999999999'],
  // BE
  [false, false, [0x12], '18'],
  [false, false, [0x12, 0x34], '4660'],
  [false, false, [0x12, 0x34, 0x56], '1193046'],
  [false, false, [0x12, 0x34, 0x56, 0x78], '305419896'],
  [false, true, [0xf2, 0x34, 0x56, 0x78], '-231451016'],
  [false, false, [0x12, 0x34, 0x56, 0x78, 0x9a], '78187493530'],
  [false, false, [0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc], '20015998343868'],
  [false, false, [0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78], '24197857161011715162171839636988778104']
];

// test-cases are the same as in u8aToBigInt
describe('u8aToBn', (): void => {
  it('converts little-endian by default', (): void => {
    expect(
      u8aToBn(
        new Uint8Array([0x12, 0x34])
      ).toString(16)
    ).toBe('3412');
  });

  describe('conversion tests', (): void => {
    for (let i = 0, count = TESTS.length; i < count; i++) {
      const [isLe, isNegative, numarr, strval] = TESTS[i];

      it(`${i}: creates ${strval} (bitLength=${numarr.length * 8}, isLe=${isLe}, isNegative=${isNegative})`, (): void => {
        expect(
          u8aToBn(
            new Uint8Array(numarr),
            { isLe, isNegative }
          ).toString()
        ).toBe(strval);
      });
    }
  });

  describe('LE', (): void => {
    for (let i = 1; i < 32; i++) {
      const tu8a = [0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78];
      const tstr = tu8a.map((n) => n.toString(16));

      it(`converts values with length ${i}`, (): void => {
        expect(
          u8aToBn(
            new Uint8Array(tu8a.slice(0, i)),
            { isLe: true }
          ).toString(16)
        ).toBe(tstr.slice(0, i).reverse().join(''));
      });
    }
  });

  describe('BE', (): void => {
    for (let i = 1; i < 32; i++) {
      const tu8a = [0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78];
      const tstr = tu8a.map((n) => n.toString(16));

      it(`converts values with length ${i}`, (): void => {
        expect(
          u8aToBn(
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

  perf('u8aToBn (i32)', 750_000, [[new Uint8Array([0x9c, 0x9c, 0x9c, 0x9c])]], (v: Uint8Array) => u8aToBn(v, { isNegative: true }));
  perf('u8aToBn (u32)', 750_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c])]], u8aToBn);
  perf('u8aToBn (u64)', 750_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c])]], u8aToBn);
  perf('u8aToBn (u128)', 750_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c, 0x68, 0x65, 0x6c, 0x6c])]], u8aToBn);
});
