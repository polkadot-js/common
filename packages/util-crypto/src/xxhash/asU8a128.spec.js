// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');

const { xxhashAsU8a128 } = require('./index');

describe('xxhashAsU8a128', () => {
  it('returns a 128-bit value (as specified)', () => {
    expect(
      xxhashAsU8a128('abc')
    ).toEqual(
      hexToU8a('0x44bc2cf5ad770999bea9ca8199328908')
    );
  });
});
