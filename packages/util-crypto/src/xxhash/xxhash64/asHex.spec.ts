// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xxhash64AsHex } from '.';

describe('xxhash64AsHex', (): void => {
  it('creates the correct hex output', (): void => {
    expect(
      xxhash64AsHex('abcd', 0xabcd)
    ).toEqual('0xe29f70f8b8c96df7');
  });
});
