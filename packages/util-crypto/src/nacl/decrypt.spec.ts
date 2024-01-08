// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { naclDecrypt, naclEncrypt } from './index.js';

describe('naclDecrypt', (): void => {
  it('decrypts a encrypted message', (): void => {
    const secret = new Uint8Array(32);
    const message = new Uint8Array([1, 2, 3, 4, 5, 4, 3, 2, 1]);
    const { encrypted, nonce } = naclEncrypt(message, secret);

    expect(
      naclDecrypt(encrypted, nonce, secret)
    ).toEqual(
      message
    );
  });

  it('returns null on invalid', (): void => {
    expect(
      naclDecrypt(new Uint8Array(), new Uint8Array(24), new Uint8Array(32))
    ).toEqual(null);
  });
});
