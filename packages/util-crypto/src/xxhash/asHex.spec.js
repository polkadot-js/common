// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhashAsHex } = require('./index');

describe('xxhashAsHex', () => {
  it('returns a 64-bit value by default', () => {
    expect(
      xxhashAsHex('abc')
    ).toEqual('0x990977adf52cbc44');
  });

  it('returns a 128-bit value (as specified)', () => {
    expect(
      xxhashAsHex('abc', 128)
    ).toEqual('0x990977adf52cbc440889329981caa9be');
  });

  it('returns a 256-bit value (as specified)', () => {
    expect(
      xxhashAsHex('abc', 256)
    ).toEqual('0x990977adf52cbc440889329981caa9bef7da5770b2b8a05303b75d95360dd62b');
  });
});
