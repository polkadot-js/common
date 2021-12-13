// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayRange } from '../array';
import { performance } from '../test/performance';
import { nToU8a } from '.';

const ptest = arrayRange(65536).map((v) => [v]);

describe('nToU8a', (): void => {
  it('converts null values to 0x00', (): void => {
    expect(
      nToU8a(null)
    ).toEqual(new Uint8Array());
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

  it('converts negative numbers', (): void => {
    expect(
      nToU8a(-1234n, { isNegative: true })
    ).toEqual(new Uint8Array([46, 251]));
  });

  it('converts negative numbers (BE)', (): void => {
    expect(
      nToU8a(-1234n, { isLe: false, isNegative: true })
    ).toEqual(new Uint8Array([251, 46]));
  });

  it('converts negative numbers (bitLength)', (): void => {
    expect(
      nToU8a(-1234n, { bitLength: 32, isNegative: true })
    ).toEqual(new Uint8Array([46, 251, 255, 255]));
  });

  performance('nToU8a', 250000, ptest, nToU8a);
});
