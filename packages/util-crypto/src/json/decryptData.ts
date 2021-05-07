// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { EncryptedJsonEncoding } from './types';

import { assert, stringToU8a, u8aFixLength } from '@polkadot/util';

import { naclDecrypt } from '../nacl';
import { scryptEncode, scryptFromU8a } from '../scrypt';
import { ENCODING, NONCE_LENGTH, SCRYPT_LENGTH } from './constants';

export function jsonDecryptData (encrypted?: Uint8Array | null, passphrase?: string | null, encType: EncryptedJsonEncoding[] = ENCODING): Uint8Array {
  assert(encrypted, 'No encrypted data available to decode');
  assert(passphrase || !encType.includes('xsalsa20-poly1305'), 'Password required to decode encrypted data');

  let encoded: Uint8Array | null = encrypted;

  if (passphrase) {
    let password: Uint8Array;

    if (encType.includes('scrypt')) {
      const { params, salt } = scryptFromU8a(encrypted);

      password = scryptEncode(passphrase, salt, params).password;
      encrypted = encrypted.subarray(SCRYPT_LENGTH);
    } else {
      password = stringToU8a(passphrase);
    }

    encoded = naclDecrypt(
      encrypted.subarray(NONCE_LENGTH),
      encrypted.subarray(0, NONCE_LENGTH),
      u8aFixLength(password, 256, true)
    );
  }

  assert(encoded, 'Unable to decode using the supplied passphrase');

  return encoded;
}
