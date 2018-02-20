// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhashAsHex256 } = require('./index');

describe('xxhashAsHex256', () => {
  it('returns a 256-bit value (as specified)', () => {
    expect(
      xxhashAsHex256('abc')
    ).toEqual('0x990977adf52cbc440889329981caa9bef7da5770b2b8a05303b75d95360dd62b');
  });
});
