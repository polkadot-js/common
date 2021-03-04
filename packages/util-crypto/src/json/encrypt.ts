// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EncryptedJson, EncryptedJsonContent } from './types';

import { u8aConcat } from '@polkadot/util';

import { naclEncrypt } from '../nacl';
import { scryptEncode, scryptToU8a } from '../scrypt';
import { jsonEncryptFormat } from './encryptFormat';

export function jsonEncrypt (data: Uint8Array, content: EncryptedJsonContent, contentExtra: string, passphrase?: string | null): EncryptedJson {
  let isEncrypted = false;
  let encoded = data;

  if (passphrase) {
    const { params, password, salt } = scryptEncode(passphrase);
    const { encrypted, nonce } = naclEncrypt(encoded, password.subarray(0, 32));

    isEncrypted = true;
    encoded = u8aConcat(scryptToU8a(salt, params), nonce, encrypted);
  }

  return jsonEncryptFormat(encoded, content, contentExtra, isEncrypted);
}
