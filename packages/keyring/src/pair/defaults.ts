// Copyright 2017-2020 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { KeyringPair$JsonEncodingTypes } from '../types';

const ENCODING: KeyringPair$JsonEncodingTypes[] = ['scrypt', 'xsalsa20-poly1305'];
const NONCE_LENGTH = 24;
const PKCS8_DIVIDER = new Uint8Array([161, 35, 3, 33, 0]);
const PKCS8_HEADER = new Uint8Array([48, 83, 2, 1, 1, 48, 5, 6, 3, 43, 101, 112, 4, 34, 4, 32]);
const PUB_LENGTH = 32;
const SALT_LENGTH = 32;
const SEC_LENGTH = 64;
const SEED_LENGTH = 32;
const SCRYPT_LENGTH = SALT_LENGTH + (3 * 4);

export {
  ENCODING,
  NONCE_LENGTH,
  PKCS8_DIVIDER,
  PKCS8_HEADER,
  PUB_LENGTH,
  SALT_LENGTH,
  SEC_LENGTH,
  SEED_LENGTH,
  SCRYPT_LENGTH
};
