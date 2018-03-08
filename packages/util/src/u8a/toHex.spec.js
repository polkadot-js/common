// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { u8aToHex } = require('./index');

describe('u8aToHex', () => {
  it('returns empty as 0x', () => {
    expect(
      u8aToHex()
    ).toEqual('0x');
  });

  it('returns the hex value for the array', () => {
    expect(
      u8aToHex(
        new Uint8Array([128, 0, 10])
      )
    ).toEqual('0x80000a');
  });

  it('handles starting zeros correctly', () => {
    expect(
      u8aToHex(
        new Uint8Array([ 0, 1, 0, 0, 0, 0, 0, 0 ])
      )
    ).toEqual('0x0001000000000000');
  });
});
