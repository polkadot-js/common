// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { arrayRange } from './index.js';

describe('arrayRange', (): void => {
  it('does not allow 0 values', (): void => {
    expect(
      () => arrayRange(0)
    ).toThrow(/Expected non-zero, positive number as a range size/);
  });

  it('creates a range of the specified length', (): void => {
    expect(
      arrayRange(10)
    ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('creates a range of the specified length, with offset', (): void => {
    expect(
      arrayRange(7, 3)
    ).toEqual([3, 4, 5, 6, 7, 8, 9]);
  });

  perf('arrayRange (100 entries)', 1_000_000, [[100]], arrayRange);
});
