// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { performance } from '../../test/performance';
import { arrayRange } from '../array';
import { BN, bnToU8a } from '.';

const ptest = arrayRange(65536).map((v) => [v]);

describe('bnToU8a', (): void => {
  it('converts null values to 0x00', (): void => {
    expect(
      bnToU8a(null, -1, false)
    ).toEqual(new Uint8Array());
  });

  it('converts null values to 0x00000000 (bitLength)', (): void => {
    expect(
      bnToU8a(null, 32, false)
    ).toEqual(new Uint8Array([0, 0, 0, 0]));
  });

  it('converts BN values to a prefixed hex representation', (): void => {
    expect(
      bnToU8a(new BN(0x123456), -1, false)
    ).toEqual(new Uint8Array([0x12, 0x34, 0x56]));
  });

  it('converts BN values to a prefixed hex representation (bitLength)', (): void => {
    expect(
      bnToU8a(new BN(0x123456), 32, false)
    ).toEqual(new Uint8Array([0x00, 0x12, 0x34, 0x56]));
  });

  it('converts using little endian (as set)', (): void => {
    expect(
      bnToU8a(new BN(0x123456), 32, true)
    ).toEqual(new Uint8Array([0x56, 0x34, 0x12, 0x00]));
  });

  it('converts negative numbers', (): void => {
    expect(
      bnToU8a(new BN(-1234), { isNegative: true })
    ).toEqual(new Uint8Array([46, 251]));
  });

  it('converts negative numbers (BE)', (): void => {
    expect(
      bnToU8a(new BN(-1234), { isLe: false, isNegative: true })
    ).toEqual(new Uint8Array([251, 46]));
  });

  it('converts negative numbers (bitLength)', (): void => {
    expect(
      bnToU8a(new BN(-1234), { bitLength: 32, isNegative: true })
    ).toEqual(new Uint8Array([46, 251, 255, 255]));
  });

  it('handles backwards compatibility', (): void => {
    expect(
      bnToU8a(new BN(1234), 32, false)
    ).toEqual(
      bnToU8a(new BN(1234), { bitLength: 32, isLe: false })
    );
  });

  performance('bnToU8a', 250000, ptest, bnToU8a);
});
