// ISC, Copyright 2017 Jaco Greeff

const BN = require('bn.js');

const bnToHex = require('./toHex');

describe('bnToHex', () => {
  it('converts BN values to a prefixed hex representation', () => {
    expect(
      bnToHex(new BN(128))
    ).toEqual('0x80');
  });

  it('converts null values to 0x', () => {
    expect(
      bnToHex(null)
    ).toEqual('0x');
  });

  it('throws when trying to convert non-BN values', () => {
    expect(
      () => bnToHex('notABn')
    ).toThrow(/Cannot convert from non-BN/);
  });
});
