// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const BN = require('bn.js');

const { bnToHex } = require('./index');

describe('bnToHex', () => {
  it('converts null values to 0x00', () => {
    expect(
      bnToHex(null)
    ).toEqual('0x00');
  });

  it('converts BN values to a prefixed hex representation', () => {
    expect(
      bnToHex(new BN(128))
    ).toEqual('0x80');
  });

  it('converts BN values to a prefixed hex representation (bitLength)', () => {
    expect(
      bnToHex(new BN(128), 16)
    ).toEqual('0x0080');
  });
});
