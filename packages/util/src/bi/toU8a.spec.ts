// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { arrayRange } from '../array/index.js';
import { TESTS } from '../bn/toU8a.spec.js';
import { perf } from '../test/index.js';
import { nToU8a } from './index.js';

const ptest = arrayRange(65536).map((v) => [v]);

describe('nToU8a', (): void => {
  describe('conversion tests', (): void => {
    for (let i = 0, count = TESTS.length; i < count; i++) {
      const [isLe, isNegative, numarr, strval] = TESTS[i];
      const bitLength = numarr.length * 8;

      it(`${i}: converts from ${strval} (bitLength=${bitLength}, isLe=${isLe}, isNegative=${isNegative})`, (): void => {
        expect(
          nToU8a(
            BigInt(strval),
            { bitLength, isLe, isNegative }
          )
        ).toEqual(new Uint8Array(numarr));
      });
    }
  });

  it('converts null values to 0x00', (): void => {
    expect(
      nToU8a(null)
    ).toEqual(new Uint8Array(1));
  });

  it('converts null values to 0x00000000 (bitLength)', (): void => {
    expect(
      nToU8a(null, { bitLength: 32 })
    ).toEqual(new Uint8Array([0, 0, 0, 0]));
  });

  it('converts values to a prefixed hex representation', (): void => {
    expect(
      nToU8a(0x123456n, { isLe: false })
    ).toEqual(new Uint8Array([0x12, 0x34, 0x56]));
  });

  it('converts values to a prefixed hex representation (bitLength)', (): void => {
    expect(
      nToU8a(0x123456n, { bitLength: 32, isLe: false })
    ).toEqual(new Uint8Array([0x00, 0x12, 0x34, 0x56]));
  });

  it('converts using little endian (as set)', (): void => {
    expect(
      nToU8a(0x123456n, { bitLength: 32, isLe: true })
    ).toEqual(new Uint8Array([0x56, 0x34, 0x12, 0x00]));
  });

  perf('nToU8a', 250000, ptest, nToU8a);
});
