// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { arrayZip } from './index.js';

describe('arrayZip', (): void => {
  it('zips a simple one', (): void => {
    expect(
      arrayZip(['a', 'b', 'c'], [1, 2, 3])
    ).toEqual([['a', 1], ['b', 2], ['c', 3]]);
  });

  it('zips where values > keys', (): void => {
    expect(
      arrayZip(['a', 'b', 'c'], [1, 2, 3, 4])
    ).toEqual([['a', 1], ['b', 2], ['c', 3]]);
  });

  it('zips where values < keys', (): void => {
    expect(
      arrayZip(['a', 'b', 'c'], [1, 2])
    ).toEqual([['a', 1], ['b', 2], ['c', undefined]]);
  });
});
