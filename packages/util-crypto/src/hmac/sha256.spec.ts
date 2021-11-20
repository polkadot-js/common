// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a, u8aToHex } from '@polkadot/util';

import { hmacSha256 } from '.';

describe('hmacSha256', (): void => {
  it('has a known output', (): void => {
    const key = stringToU8a('secret');
    const data = stringToU8a('some message');

    expect(
      u8aToHex(
        hmacSha256(key, data)
      )
    ).toEqual(
      '0xf28a70b41263840e5c059a0a733336e0957efba87902aa8cca11441d4b0c96d7'
    );
  });
});
