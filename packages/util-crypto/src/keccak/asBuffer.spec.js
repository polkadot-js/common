// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { keccakAsBuffer } = require('./index');

const value = 'test value';
const result = '2d07364b5c231c56ce63d49430e085ea3033c750688ba532b24029124c26ca5e';

describe('keccakAsBuffer', () => {
  it('returns an hex representation', () => {
    expect(
      keccakAsBuffer(value).equals(
        Buffer.from(result, 'hex')
      )
    ).toEqual(true);
  });
});
