// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');

const { blake2AsU8a128 } = require('./index');

describe('blake2AsU8a128', () => {
  it('returns a 128-bit value (as specified)', () => {
    expect(
      blake2AsU8a128('abc')
    ).toEqual(
      new Uint8Array([207, 74, 183, 145, 198, 43, 141, 43, 33, 9, 201, 2, 117, 40, 120, 22])
    );
  });
});
