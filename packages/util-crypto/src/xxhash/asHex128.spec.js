// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');

const { xxhashAsHex128 } = require('./index');

describe('xxhashAsHex128', () => {
  it('returns a 128-bit value (as specified)', () => {
    expect(
      xxhashAsHex128('abc')
    ).toEqual('0x990977adf52cbc440889329981caa9be');
  });

  it('matches with Rust implementation', () => {
    expect(
      xxhashAsHex128(
        hexToU8a('0x7379733a6e6f6e3a2f8c6129d816cf51c374bc7f08c3e63ed156cf78aefb4a6550d97b87997977ee')
      )
    ).toEqual(
      '0xc7f790aa4fc95a8813b0d5734a8c195b'
    );
  });
});
