// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { compactAddLength } from './index.js';

describe('compactAddLength', (): void => {
  it('correctly adds the length prefix', (): void => {
    expect(
      compactAddLength(Uint8Array.from([12, 13]))
    ).toEqual(Uint8Array.from([2 << 2, 12, 13]));
  });
});
