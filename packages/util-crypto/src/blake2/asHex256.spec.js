// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { blake2AsHex256 } = require('./index');

describe('blake2AsHex256', () => {
  it('returns a 256-bit value (as specified)', () => {
    expect(
      blake2AsHex256('abc')
    ).toEqual('0xbddd813c634239723171ef3fee98579b94964e3bb1cb3e427262c8c068d52319');
  });
});
