// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhashAsHex } = require('./index');

describe('xxhashAsHex', () => {
  it('returns a 64-bit value by default', () => {
    expect(
      xxhashAsHex('abc')
    ).toEqual('0x44bc2cf5');
  });

  it('returns a 32-bit value (as specified)', () => {
    expect(
      xxhashAsHex('abc', 32)
    ).toEqual('0x44bc');
  });

  it('returns a 128-bit value (as specified)', () => {
    expect(
      xxhashAsHex('abc', 128)
    ).toEqual('0x44bc2cf5ad770999');
  });

  it('returns a 256-bit value (as specified)', () => {
    expect(
      xxhashAsHex('abc', 256)
    ).toEqual('0x44bc2cf5ad770999bea9ca8199328908');
  });
});
