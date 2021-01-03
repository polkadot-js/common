// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { compactAddLength } from '.';

describe('compactAddLength', (): void => {
  it('correctly adds the length prefix', (): void => {
    expect(
      compactAddLength(Uint8Array.from([12, 13]))
    ).toEqual(Uint8Array.from([2 << 2, 12, 13]));
  });
});
