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
      hexToU8a('0x990977adf52cbc440889329981caa9bef7da5770b2b8a05303b75d95360dd62b')
    );
  });
});
