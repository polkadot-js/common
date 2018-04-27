// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { u8aToHexShort } = require('./index');

describe('u8aToHexShort', () => {
  const input = new Uint8Array([1, 2, 3, 4, 5, 0, 6, 7, 8, 9]);

  it('returns empty as 0x', () => {
    expect(
      u8aToHexShort()
    ).toEqual('0x');
  });

  it('returns the hex value for the array (max >= length)', () => {
    expect(
      u8aToHexShort(input, 20)
    ).toEqual('0x01020304050006070809');
  });

  it('returns the hex value for the array (max (default) < length)', () => {
    expect(
      u8aToHexShort(input)
    ).toEqual('0x0102030405000607…');
  });

  it('returns the hex value for the array (max < length)', () => {
    expect(
      u8aToHexShort(input, 10)
    ).toEqual('0x0102030405…');
  });
});
