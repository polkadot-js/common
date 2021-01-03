// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aConcat } from '.';

describe('u8aConcat', (): void => {
  it('concatenates arrays', (): void => {
    expect(
      u8aConcat(
        new Uint8Array([1, 2, 3, 4]),
        new Uint8Array([5, 6]),
        new Uint8Array([7, 8, 9])
      )
    ).toEqual(
      new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9])
    );
  });

  it('concatenates arrays & hex values', (): void => {
    expect(
      u8aConcat(
        new Uint8Array([1, 2, 3, 4]),
        '0x0506',
        '0x070809'
      )
    ).toEqual(
      new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9])
    );
  });
});
