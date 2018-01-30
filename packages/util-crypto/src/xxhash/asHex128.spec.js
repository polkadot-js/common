// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhashAsHex128 } = require('./index');

describe('xxhashAsHex128', () => {
  it('returns a 128-bit value (as specified)', () => {
    expect(
      xxhashAsHex128('abc')
    ).toEqual('0x44bc2cf5ad770999bea9ca8199328908');
  });
});
