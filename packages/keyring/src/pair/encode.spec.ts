// Copyright 2017-2023 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { NONCE_LENGTH, SCRYPT_LENGTH } from '@polkadot/util-crypto/json/constants';

import { createTestPairs } from '../testingPairs.js';
import { PKCS8_DIVIDER, PKCS8_HEADER, PUB_LENGTH, SEC_LENGTH } from './defaults.js';

const PKCS8_LENGTH = PKCS8_DIVIDER.length + PKCS8_HEADER.length + PUB_LENGTH + SEC_LENGTH;
const ENCODED_LENGTH = 16 + PKCS8_LENGTH + NONCE_LENGTH + SCRYPT_LENGTH;

const keyring = createTestPairs({ type: 'ed25519' }, false);

describe('encode', (): void => {
  it('returns PKCS8 when no passphrase supplied', (): void => {
    expect(
      keyring.alice.encodePkcs8()
    ).toHaveLength(PKCS8_LENGTH);
  });

  it('returns encoded PKCS8 when passphrase supplied', (): void => {
    expect(
      keyring.alice.encodePkcs8('testing')
    ).toHaveLength(ENCODED_LENGTH);
  });
});
