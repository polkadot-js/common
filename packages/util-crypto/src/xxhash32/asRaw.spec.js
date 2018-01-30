// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhash32AsRaw } = require('./index');

describe('xxhash32AsRaw', () => {
  it('creates the correct non-prefixed hex output', () => {
    expect(
      xxhash32AsRaw('abcd', 0xabcd)
    ).toEqual('cda8fae4');
  });
});
