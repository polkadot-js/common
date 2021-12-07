// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '@polkadot/util';

import { convertPublicKeyToCurve25519, convertSecretKeyToCurve25519 } from '.';

describe('convertPublicKeyToCurve25519', (): void => {
  it('converts a known key correctly', (): void => {
    expect(
      u8aToHex(convertPublicKeyToCurve25519(
        new Uint8Array([
          180, 114, 93, 155, 165, 255, 217, 82,
          16, 250, 209, 11, 193, 10, 88, 218,
          190, 190, 41, 193, 236, 252, 1, 152,
          216, 214, 0, 41, 45, 138, 13, 53
        ])
      ))
    ).toEqual('0x5e05848ceeef4f306d6e285a26faf1a8070cf0c89f8d28ab966002fe4ad17746');
  });
});

describe('convertSecretKeyToCurve25519', (): void => {
  it('converts a known key correctly', (): void => {
    expect(
      u8aToHex(convertSecretKeyToCurve25519(
        new Uint8Array([
          1, 2, 3, 4, 5, 6, 7, 8,
          1, 2, 3, 4, 5, 6, 7, 8,
          1, 2, 3, 4, 5, 6, 7, 8,
          1, 2, 3, 4, 5, 6, 7, 8
        ])
      ))
    ).toEqual('0xd875a82940b9174dabb1c0c895485810cc2870f5808565b59d4ef708bdcf526c');
  });
});
