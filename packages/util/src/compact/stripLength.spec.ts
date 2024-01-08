// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { compactStripLength } from './index.js';

describe('compactStripLength', (): void => {
  it('correctly removes the length prefix', (): void => {
    expect(
      compactStripLength(Uint8Array.from([2 << 2, 12, 13]))
    ).toEqual([
      3,
      Uint8Array.from([12, 13])
    ]);
  });
});
