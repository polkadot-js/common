// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhash32AsHex } = require('./index');

describe('xxhash32AsHex', () => {
  it('creates the correct hex output', () => {
    expect(
      xxhash32AsHex('abcd', 0xabcd)
    ).toEqual('0xcda8fae4');
  });
});
