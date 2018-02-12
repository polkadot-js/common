// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const BN = require('bn.js');

const { bnToBn } = require('./index');

describe('bnToBn', () => {
  it('converts null values to 0x00', () => {
    expect(
      bnToBn(null)
    ).toEqual(new BN(0));
  });

  it('converts BN values to BN', () => {
    expect(
      bnToBn(new BN(128))
    ).toEqual(new BN(128));
  });

  it('converts number values to BN', () => {
    expect(
      bnToBn(128)
    ).toEqual(new BN(128));
  });
});
