// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringPair$JsonVersion } from '../types';

import { stringToU8a, u8aConcat, u8aFixLength } from '@polkadot/util/index';
import { naclEncrypt } from '@polkadot/util-crypto/index';

import { PKCS8_DIVIDER, PKCS8_HEADER } from './defaults';

export default function encode (version: KeyringPair$JsonVersion, secretKey: Uint8Array, passphrase?: string): Uint8Array {
  const encoded = u8aConcat(
    PKCS8_HEADER,
    secretKey.subarray(0, 32),
    PKCS8_DIVIDER,
    version === '0'
      ? secretKey.subarray(32, 64)
      : secretKey.subarray(32, 96)
  );

  if (!passphrase) {
    return encoded;
  }

  const { encrypted, nonce } = naclEncrypt(encoded, u8aFixLength(stringToU8a(passphrase), 256, true));

  return u8aConcat(nonce, encrypted);
}
