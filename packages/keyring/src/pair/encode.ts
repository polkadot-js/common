// Copyright 2017-2020 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { PairInfo } from './types';

import { u8aConcat, assert } from '@polkadot/util';
import { naclEncrypt, scryptEncode, scryptToU8a } from '@polkadot/util-crypto';

import { PKCS8_DIVIDER, PKCS8_HEADER } from './defaults';

export default function encode ({ publicKey, secretKey }: PairInfo, passphrase?: string): Uint8Array {
  assert(secretKey, 'Expected a valid secretKey to be passed to encode');

  const encoded = u8aConcat(
    PKCS8_HEADER,
    secretKey,
    PKCS8_DIVIDER,
    publicKey
  );

  if (!passphrase) {
    return encoded;
  }

  const { params, password, salt } = scryptEncode(passphrase);
  const { encrypted, nonce } = naclEncrypt(encoded, password.subarray(0, 32));

  return u8aConcat(scryptToU8a(salt, params), nonce, encrypted);
}
