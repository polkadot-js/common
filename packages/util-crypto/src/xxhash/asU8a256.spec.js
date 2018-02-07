// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');

const { xxhashAsU8a256 } = require('./index');

describe('xxhashAsU8a256', () => {
  it('returns a 256-bit value (as specified)', () => {
    expect(
      xxhashAsU8a256('abc')
    ).toEqual(
      hexToU8a('0x44bc2cf5ad770999bea9ca819932890853a0b8b27057daf72bd60d36955db703')
    );
  });
});
