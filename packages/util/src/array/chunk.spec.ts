// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { perf } from '../test/performance';
import { arrayChunk, arrayRange } from '.';

describe('arrayChunk', (): void => {
  it('chunks arrays', (): void => {
    expect(
      arrayChunk([1, 2, 3, 4, 5, 6, 7], 3)
    ).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  perf('arrayChunk', 200_000, [[arrayRange(500), 50]], arrayChunk);
});
