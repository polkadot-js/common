// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a, u8aToHex } from '@polkadot/util';

import { hmacSha512 } from '.';

describe('hmacSha512', (): void => {
  it('has a known output', (): void => {
    const key = stringToU8a('secret');
    const data = stringToU8a('some message');

    expect(
      u8aToHex(
        hmacSha512(key, data)
      )
    ).toEqual(
      '0x295832e97ed77be75a9fa98029497e4a722c4b9a2f21b39d34f1befa931a39ec520fd24711d6f5c03501384ea66b83066a01a82c57a0460f8cd1f471fcce5841'
    );
  });
});
