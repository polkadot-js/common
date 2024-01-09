// Copyright 2017-2024 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { NONCE_LENGTH, SCRYPT_LENGTH } from '@polkadot/util-crypto/json/constants';

import { createTestPairs } from '../testingPairs.js';
import { PAIR_DIV, PAIR_HDR, PUB_LENGTH, SEC_LENGTH } from './defaults.js';

const DECODED_LENGTH = PAIR_DIV.length + PAIR_HDR.length + PUB_LENGTH + SEC_LENGTH;
const ENCODED_LENGTH = 16 + DECODED_LENGTH + NONCE_LENGTH + SCRYPT_LENGTH;

const keyring = createTestPairs({ type: 'ed25519' }, false);

describe('encode', (): void => {
  it('returns PKCS8 when no passphrase supplied', (): void => {
    expect(
      keyring.alice.encodePkcs8()
    ).toHaveLength(DECODED_LENGTH);
  });

  it('returns encoded PKCS8 when passphrase supplied', (): void => {
    expect(
      keyring.alice.encodePkcs8('testing')
    ).toHaveLength(ENCODED_LENGTH);
  });
});
