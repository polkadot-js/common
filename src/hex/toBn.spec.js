// ISC, Copyright 2017-2018 Jaco Greeff

const BN = require('bn.js');

const { hexToBn } = require('./index');

describe('hexToBn', () => {
  const value = '80';

  it('converts prefixed hex values to BN', () => {
    expect(
      hexToBn(`0x${value}`).eq(
        new BN(value, 16)
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
});
