// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { arrayRange } from '../array/index.js';
import { TESTS } from '../bi/toU8a.spec.js';
import { perf } from '../test/index.js';
import { BN, bnToU8a } from './index.js';

const ptest = arrayRange(65536).map((v) => [v]);

describe('bnToU8a', (): void => {
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

  describe('conversion tests', (): void => {
    TESTS.forEach(([isLe, isNegative, numarr, strval], i): void => {
      const bitLength = numarr.length * 8;

      it(`#${i}: converts from ${strval} (bitLength=${bitLength}, isLe=${isLe}, isNegative=${isNegative})`, (): void => {
        expect(
          bnToU8a(
            new BN(strval),
            { bitLength, isLe, isNegative }
          )
        ).toEqual(new Uint8Array(numarr));
      });
    });
  });

  perf('bnToU8a', 250000, ptest, bnToU8a);
});
