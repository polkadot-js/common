// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { arrayRange } from '../array/index.js';
import { perf } from '../test/index.js';
import { BN, bnToU8a } from './index.js';

const ptest = arrayRange(65536).map((v) => [v]);

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

describe('bnToU8a', (): void => {
  describe('conversion tests', (): void => {
    for (let i = 0, count = TESTS.length; i < count; i++) {
      const [isLe, isNegative, numarr, strval] = TESTS[i];

      it(`${i}: converts from ${strval} (bitLength=${numarr.length * 8}, isLe=${isLe}, isNegative=${isNegative})`, (): void => {
        expect(
          bnToU8a(
            new BN(strval),
            { isLe, isNegative }
          )
        ).toEqual(new Uint8Array(numarr));
      });
    }
  });

  it('converts null values to 0x00', (): void => {
    expect(
      bnToU8a(null)
    ).toEqual(new Uint8Array(1));
  });

  it('converts null values to 0x00000000 (bitLength)', (): void => {
    expect(
      bnToU8a(null, { bitLength: 32 })
    ).toEqual(new Uint8Array([0, 0, 0, 0]));
  });

  it('converts BN values to a prefixed hex representation', (): void => {
    expect(
      bnToU8a(new BN(0x123456), { isLe: false })
    ).toEqual(new Uint8Array([0x12, 0x34, 0x56]));
  });

  it('converts BN values to a prefixed hex representation (bitLength)', (): void => {
    expect(
      bnToU8a(new BN(0x123456), { bitLength: 32, isLe: false })
    ).toEqual(new Uint8Array([0x00, 0x12, 0x34, 0x56]));
  });

  it('converts using little endian (as set)', (): void => {
    expect(
      bnToU8a(new BN(0x123456), { bitLength: 32, isLe: true })
    ).toEqual(new Uint8Array([0x56, 0x34, 0x12, 0x00]));
  });

  perf('bnToU8a', 250000, ptest, bnToU8a);
});
