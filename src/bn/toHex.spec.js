// ISC, Copyright 2017-2018 Jaco Greeff

const BN = require('bn.js');

const { bnToHex } = require('./index');

describe('bnToHex', () => {
  it('converts BN values to a prefixed hex representation', () => {
    expect(
      bnToHex(new BN(128))
    ).toEqual('0x80');
  });

  it('converts null values to 0x00', () => {
    expect(
      bnToHex(null)
    ).toEqual('0x00');
  });
});
