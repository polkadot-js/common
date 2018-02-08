// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhash64AsHex } = require('./index');

describe('xxhash64AsHex', () => {
  it('creates the correct hex output', () => {
    expect(
      xxhash64AsHex('abcd', 0xabcd)
    ).toEqual('0xe29f70f8b8c96df7');
  });
});
