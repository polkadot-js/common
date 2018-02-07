// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');

const { blake2AsU8a128 } = require('./index');

describe('blake2AsU8a128', () => {
  it('returns a 128-bit value (as specified)', () => {
    expect(
      blake2AsU8a128('abc')
    ).toEqual(
      hexToU8a('0xba80a53f981c4d0d6a2797b69f12f6e9')
    );
  });
});
