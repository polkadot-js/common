// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { naclEncrypt } from '.';

describe('naclEncrypt', (): void => {
  it('encrypts a message', (): void => {
    const secret = new Uint8Array(32);
    const message = new Uint8Array([1, 2, 3, 4, 5, 4, 3, 2, 1]);

    expect(
      naclEncrypt(message, secret, new Uint8Array(24))
    ).toEqual({
      encrypted: new Uint8Array([94, 21, 20, 69, 68, 221, 140, 245, 200, 67, 77, 188, 129, 85, 227, 141, 199, 60, 184, 251, 251, 129, 205, 46, 234]),
      nonce: new Uint8Array(24)
    });
  });
});
