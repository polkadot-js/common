// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { blake2sAsBuffer } = require('./index');

describe('blake2sAsBuffer', () => {
  it('creates the correct hash', () => {
    expect(
      blake2sAsBuffer('abc')
    ).toEqual(
      Buffer.from('508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982', 'hex')
    );
  });
});
