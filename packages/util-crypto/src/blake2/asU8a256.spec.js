// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');

const { blake2AsU8a256 } = require('./index');

describe('blake2AsU8a256', () => {
  it('returns a 256-bit value (as specified)', () => {
    expect(
      blake2AsU8a256('abc')
    ).toEqual(
      hexToU8a('0xba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d1')
    );
  });
});
