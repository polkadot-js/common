// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { arrayRange } from '../array/index.js';
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

  describe('signed', (): void => {
    it('converts negative numbers (BE)', (): void => {
      expect(
        bnToU8a(new BN(-1234), { isLe: false, isNegative: true })
      ).toEqual(new Uint8Array([251, 46]));
    });

    it('converts negative numbers (LE, i8)', (): void => {
      expect(
        bnToU8a(new BN(-12), { isNegative: true })
      ).toEqual(new Uint8Array([244]));
    });

    it('converts negative numbers (LE, i16)', (): void => {
      expect(
        bnToU8a(new BN(-1234), { isNegative: true })
      ).toEqual(new Uint8Array([46, 251]));
    });

    it('converts negative numbers (LE, i24)', (): void => {
      expect(
        bnToU8a(new BN(-123456), { isNegative: true })
      ).toEqual(new Uint8Array([192, 29, 254]));
    });

    it('converts negative numbers (LE, i32)', (): void => {
      expect(
        bnToU8a(new BN(-123456789), { isNegative: true })
      ).toEqual(new Uint8Array([235, 50, 164, 248]));
    });

    it('converts negative numbers (LE, i40)', (): void => {
      expect(
        bnToU8a(new BN(-5678999999), { isNegative: true })
      ).toEqual(new Uint8Array([65, 86, 129, 173, 254]));
    });

    it('converts negative numbers (LE, i48)', (): void => {
      expect(
        bnToU8a(new BN(-9999999999999), { isNegative: true })
      ).toEqual(new Uint8Array([1, 96, 141, 177, 231, 246]));
    });

    it('converts negative numbers (LE, i64)', (): void => {
      expect(
        bnToU8a(new BN('-999999999999999999'), { isNegative: true })
      ).toEqual(new Uint8Array([1, 0, 156, 88, 76, 73, 31, 242]));
    });

    it('converts negative numbers (LE, bitLength)', (): void => {
      expect(
        bnToU8a(new BN(-1234), { bitLength: 32, isNegative: true })
      ).toEqual(new Uint8Array([46, 251, 255, 255]));
    });

    it('converts negative numbers (LE, bitLength)', (): void => {
      expect(
        bnToU8a(new BN(-123456), { bitLength: 32, isNegative: true })
      ).toEqual(new Uint8Array([192, 29, 254, 255]));
    });
  });

  perf('bnToU8a', 250000, ptest, bnToU8a);
});
