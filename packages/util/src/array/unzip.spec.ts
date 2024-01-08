// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { arrayUnzip } from './index.js';

describe('arrayUnzip', (): void => {
  it('unzips entries', (): void => {
    expect(
      arrayUnzip([['a', 1], ['b', 2], ['c', 3]])
    ).toEqual([['a', 'b', 'c'], [1, 2, 3]]);
  });
});
