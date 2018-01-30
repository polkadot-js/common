// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { blake2AsHex } = require('./index');

describe('blake2AsHex', () => {
  it('returns a 64-bit value by default', () => {
    expect(
      blake2AsHex('abc')
    ).toEqual('0xba80a53f981c4d0d');
  });

  it('returns a 128-bit value (as specified)', () => {
    expect(
      blake2AsHex('abc', 128)
    ).toEqual('0xba80a53f981c4d0d6a2797b69f12f6e9');
  });

  it('returns a 256-bit value (as specified)', () => {
    expect(
      blake2AsHex('abc', 256)
    ).toEqual('0xba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d1');
  });

  it('returns a 512-bit value (as specified)', () => {
    expect(
      blake2AsHex('abc', 512)
    ).toEqual('0xba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923');
  });
});
