// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhashAsHex256 } = require('./index');

describe('xxhashAsHex256', () => {
  it('returns a 256-bit value (as specified)', () => {
    expect(
      xxhashAsHex256('abc', 256)
    ).toEqual('0x44bc2cf5ad770999bea9ca819932890853a0b8b27057daf72bd60d36955db703');
  });
});
