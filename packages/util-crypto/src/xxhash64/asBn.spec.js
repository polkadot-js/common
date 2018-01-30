// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhash64AsBn } = require('./index');

describe('xxhash64AsBn', () => {
  it('creates the correct BN output', () => {
    expect(
      xxhash64AsBn('abcd', 0xabcd).toString(16)
    ).toEqual('e29f70f8b8c96df7');
  });
});
