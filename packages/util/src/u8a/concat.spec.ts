// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { getRandomValues } from '@polkadot/x-randomvalues';

import { arrayRange } from '../array/index.js';
import { perf } from '../test/index.js';
import { u8aConcat, u8aConcatStrict } from './index.js';

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

  perf('u8aConcat', 10000, [[ptest]], u8aConcat);
  perf('u8aConcatStrict', 10000, [[[ptest]]], u8aConcatStrict);
  perf('u8aConcatStrict (len)', 10000, [[[ptest], 320]], u8aConcatStrict);
});
