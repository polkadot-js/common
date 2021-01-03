// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import xxhash64AsRaw from './asRaw';

describe('xxhash64AsRaw', (): void => {
  it('creates the correct non-prefixed hex output', (): void => {
    expect(
      xxhash64AsRaw('abcd', 0xabcd)
    ).toEqual('e29f70f8b8c96df7');
  });
});
