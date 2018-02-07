// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');

const { keccakAsU8a } = require('./index');

describe('keccakAsU8a', () => {
  it('returns an hex representation', () => {
    expect(
      keccakAsU8a('test value')
    ).toEqual(
      hexToU8a('0x2d07364b5c231c56ce63d49430e085ea3033c750688ba532b24029124c26ca5e')
    );
  });
});
