// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const BN = require('bn.js');

const { bnToU8a } = require('./index');

describe('bnToU8a', () => {
  it('converts BN values to a prefixed hex representation', () => {
    expect(
      bnToU8a(new BN(0x123456))
    ).toEqual(new Uint8Array([0x12, 0x34, 0x56]));
  });

  it('converts null values to 0x00', () => {
    expect(
      bnToU8a(null)
    ).toEqual(new Uint8Array([]));
  });
});
