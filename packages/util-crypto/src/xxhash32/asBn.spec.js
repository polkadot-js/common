// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { xxhash32AsBn } = require('./index');

describe('xxhash32AsBn', () => {
  it('creates the correct BN output', () => {
    expect(
      xxhash32AsBn('abcd', 0xabcd).toString(16)
    ).toEqual('cda8fae4');
  });
});
