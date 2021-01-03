// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { compactStripLength } from '.';

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
