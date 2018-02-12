// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { u8aToBn } = require('./index');

describe('u8aToBn', () => {
  it('converts values', () => {
    expect(
      u8aToBn(
        new Uint8Array([0x12, 0x34])
      ).toString(16)
    ).toEqual('1234');
  });

  it('converts empty', () => {
    expect(
      u8aToBn(
        new Uint8Array([])
      ).toString(16)
    ).toEqual('0');
  });
});
