// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const BN = require('bn.js');

const { hexToBn } = require('./index');

describe('hexToBn', () => {
  it('converts prefixed hex values to BN', () => {
    expect(
      hexToBn(0x81).eq(
        new BN(0x81)
      )
    ).toEqual(true);
  });

  it('converts null values to BN(0)', () => {
    expect(
      hexToBn(null).eq(
        new BN(0)
      )
    ).toEqual(true);
  });

  it('converts 0x values to BN(0)', () => {
    expect(
      hexToBn('0x').eq(
        new BN(0)
      )
    ).toEqual(true);
  });
});
