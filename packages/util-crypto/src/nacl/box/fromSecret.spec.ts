// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { naclBoxKeypairFromSecret } from '..';

describe('naclBoxKeypairFromSecret', (): void => {
  const secretKey = new Uint8Array([
    18, 52, 86, 120, 144, 18, 52, 86,
    120, 144, 18, 52, 86, 120, 144, 18,
    18, 52, 86, 120, 144, 18, 52, 86,
    120, 144, 18, 52, 86, 120, 144, 18
  ]);

  it('generates a valid publicKey/secretKey pair', (): void => {
    expect(
      naclBoxKeypairFromSecret(secretKey)
    ).toEqual({
      publicKey: new Uint8Array([
        206, 110, 228, 222, 155, 43, 229, 254,
        38, 117, 157, 116, 224, 87, 139, 171,
        17, 195, 144, 167, 106, 36, 161, 28,
        25, 232, 127, 47, 219, 165, 44, 102
      ]),
      secretKey
    });
  });
});
