// Copyright 2017-2024 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { createTestPairs } from '../testingPairs.js';

const keyring = createTestPairs({ type: 'ed25519' }, false);

describe('toJson', (): void => {
  it('creates an unencoded output with no passphrase', (): void => {
    expect(
      keyring.alice.toJson()
    ).toMatchObject({
      address: '5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua',
      encoded: 'MFMCAQEwBQYDK2VwBCIEIEFsaWNlICAgICAgICAgICAgICAgICAgICAgICAgICAg0XKnTNpMhlkSwyugqApXrmmrrkEOXMtZ3uhOL0Qy20+hIwMhANFyp0zaTIZZEsMroKgKV65pq65BDlzLWd7oTi9EMttP',
      encoding: {
        content: ['pkcs8', 'ed25519'],
        type: ['none'],
        version: '3'
      },
      meta: {
        isTesting: true,
        name: 'alice'
      }
    });
  });

  it('creates an encoded output with passphrase', (): void => {
    const json = keyring.alice.toJson('testing');

    expect(json.encoded).toHaveLength(268);
    expect(json).toMatchObject({
      address: '5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua',
      encoding: {
        content: ['pkcs8', 'ed25519'],
        type: ['scrypt', 'xsalsa20-poly1305'],
        version: '3'
      }
    });
  });
});
