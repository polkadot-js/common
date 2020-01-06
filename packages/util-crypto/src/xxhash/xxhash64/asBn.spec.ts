// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { xxhash64AsBn } from '.';

describe('xxhash64AsBn', (): void => {
  it('creates the correct BN output', (): void => {
    expect(
      xxhash64AsBn('abcd', 0xabcd).toString(16)
    ).toEqual('e29f70f8b8c96df7');
  });
});
