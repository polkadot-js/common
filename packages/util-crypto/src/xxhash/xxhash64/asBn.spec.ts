// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import xxhash64AsBn from './asBn';

describe('xxhash64AsBn', (): void => {
  it('creates the correct BN output', (): void => {
    expect(
      xxhash64AsBn('abcd', 0xabcd).toString(16)
    ).toEqual('e29f70f8b8c96df7');
  });
});
