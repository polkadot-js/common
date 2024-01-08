// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { isUndefined } from './index.js';

describe('isUndefined', (): void => {
  it('returns true on undefined values', (): void => {
    expect(
      isUndefined()
    ).toEqual(true);
  });

  it('returns false on defined values', (): void => {
    expect(
      isUndefined(null)
    ).toEqual(false);
  });

  perf('isUndefined', 10_000_000, [[null]], isUndefined);
});
