// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { blake2bAsU8a } from '.';

describe('blake2bAsU8a', () => {
  it('creates the correct hash (default length)', () => {
    expect(
      blake2bAsU8a('abc')
    ).toEqual(new Uint8Array([186, 128, 165, 63, 152, 28, 77, 13, 106, 39, 151, 182, 159, 18, 246, 233, 76, 33, 47, 20, 104, 90, 196, 183, 75, 18, 187, 111, 219, 255, 162, 209, 125, 135, 197, 57, 42, 171, 121, 45, 194, 82, 213, 222, 69, 51, 204, 149, 24, 211, 138, 168, 219, 241, 146, 90, 185, 35, 134, 237, 212, 0, 153, 35]));
  });

  it('creates the correct hash', () => {
    expect(
      blake2bAsU8a('abc', 256)
    ).toEqual(
      new Uint8Array([189, 221, 129, 60, 99, 66, 57, 114, 49, 113, 239, 63, 238, 152, 87, 155, 148, 150, 78, 59, 177, 203, 62, 66, 114, 98, 200, 192, 104, 213, 35, 25])
    );
  });
});
