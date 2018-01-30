// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhash64AsRaw } = require('./index');

describe('xxhash64AsRaw', () => {
  it('creates the correct non-prefixed hex output', () => {
    expect(
      xxhash64AsRaw('abcd', 0xabcd)
    ).toEqual('e29f70f8b8c96df7');
  });
});
