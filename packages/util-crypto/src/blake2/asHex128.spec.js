// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { blake2AsHex128 } = require('./index');

describe('blake2AsHex128', () => {
  it('returns a 128-bit value (as specified)', () => {
    expect(
      blake2AsHex128('abc')
    ).toEqual('0xba80a53f981c4d0d6a2797b69f12f6e9');
  });
});
