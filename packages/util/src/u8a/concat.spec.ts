// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { getRandomValues } from '@polkadot/x-randomvalues';

import { arrayRange } from '../array';
import { performance } from '../test/performance';
import { u8aConcat } from '.';

const ptest = arrayRange(10).map(() => getRandomValues(new Uint8Array(32)));

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

  performance('u8aConcat', 50000, [[ptest]], u8aConcat);
});
