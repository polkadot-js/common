// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { arrayFlatten } from './index.js';

const PERF_ONE = [[1, 2, 3, 4, 5]];
const PERF_MUL = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

describe('arrayFlatten', (): void => {
  it('flattens arrays', (): void => {
    expect(
      arrayFlatten([[0], [1, 2, 3], [4, 5], [6], [], [7, 8]])
    ).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('flattens a single entry', (): void => {
    expect(
      arrayFlatten([[1, 2, 3, 4, 5]])
    ).toEqual([1, 2, 3, 4, 5]);
  });

  it('flattens an empty', (): void => {
    expect(
      arrayFlatten([])
    ).toEqual([]);
  });

  perf('arrayFlatten (single)', 10_000_000, [[PERF_ONE]], arrayFlatten);
  perf('arrayFlatten (multi)', 700_000, [[PERF_MUL]], arrayFlatten);
});
