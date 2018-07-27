// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';

import { bnToU8a } from './index';

describe('bnToU8a', () => {
  it('converts null values to 0x00', () => {
    expect(
      bnToU8a(null, -1, false)
    ).toEqual(new Uint8Array([]));
  });

  it('converts null values to 0x00000000 (bitLength)', () => {
    expect(
      bnToU8a(null, 32, false)
    ).toEqual(new Uint8Array([0, 0, 0, 0]));
  });

  it('converts BN values to a prefixed hex representation', () => {
    expect(
      bnToU8a(new BN(0x123456), -1, false)
    ).toEqual(new Uint8Array([0x12, 0x34, 0x56]));
  });

  it('converts BN values to a prefixed hex representation (bitLength)', () => {
    expect(
      bnToU8a(new BN(0x123456), 32, false)
    ).toEqual(new Uint8Array([0x00, 0x12, 0x34, 0x56]));
  });

  it('converts using little endian (as set)', () => {
    expect(
      bnToU8a(new BN(0x123456), 32, true)
    ).toEqual(new Uint8Array([0x56, 0x34, 0x12, 0x00]));
  });
});
