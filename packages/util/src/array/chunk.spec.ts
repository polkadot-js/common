// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { arrayChunk, arrayRange } from '../index.js';
import { perf } from '../test/index.js';

describe('arrayChunk', (): void => {
  it('chunks with exact', (): void => {
    expect(
      arrayChunk([1, 2, 3, 4, 5, 6, 7, 8], 8)
    ).toEqual([[1, 2, 3, 4, 5, 6, 7, 8]]);
  });

  it('chunks with unequal', (): void => {
    expect(
      arrayChunk([1, 2, 3, 4, 5, 6, 7], 3)
    ).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  it('chunks with non-empty results', (): void => {
    expect(
      arrayChunk([[1, 2], [3, 4], [5, 6], [7, 8]], 2)
    ).toEqual([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]);
  });

  perf('arrayChunk', 200_000, [[arrayRange(500), 50]], arrayChunk);
});
