// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { createKeyMulti } from '.';

describe('createKeyMulti', (): void => {
  it('creates a valid multikey (aligning with Rust, needs sorting)', (): void => {
    expect(
      createKeyMulti([
        new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0]),
        new Uint8Array([3, 0, 0, 0, 0, 0, 0, 0]),
        new Uint8Array([2, 0, 0, 0, 0, 0, 0, 0])
      ], 2)
    ).toEqual(
      new Uint8Array([67, 151, 196, 155, 179, 207, 47, 123, 90, 2, 35, 54, 162, 111, 241, 226, 88, 148, 54, 193, 252, 195, 93, 101, 16, 5, 93, 101, 186, 186, 254, 79])
    );
  });
});
