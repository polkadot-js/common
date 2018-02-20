// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { blake2AsU8a256 } = require('./index');

describe('blake2AsU8a256', () => {
  it('returns a 256-bit value (as specified)', () => {
    expect(
      blake2AsU8a256('abc')
    ).toEqual(
      new Uint8Array([189, 221, 129, 60, 99, 66, 57, 114, 49, 113, 239, 63, 238, 152, 87, 155, 148, 150, 78, 59, 177, 203, 62, 66, 114, 98, 200, 192, 104, 213, 35, 25])
    );
  });
});
