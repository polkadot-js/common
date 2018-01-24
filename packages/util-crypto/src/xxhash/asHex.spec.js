// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhashAsHex } = require('./index');

describe('xxhashAsHex', () => {
  it('creates the correct hex output', () => {
    expect(
      xxhashAsHex('abcd', 0xabcd)
    ).toEqual('0xcda8fae4');
  });
});
