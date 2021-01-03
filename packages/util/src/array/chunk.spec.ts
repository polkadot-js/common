// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { arrayChunk } from '.';

describe('arrayChunk', (): void => {
  it('chunks arrays', (): void => {
    expect(
      arrayChunk([1, 2, 3, 4, 5, 6, 7], 3)
    ).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });
});
