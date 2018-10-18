// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import stringToU8a from '@polkadot/util/string/toU8a';
import u8aConcat from '@polkadot/util/u8a/concat';
import u8aFixLength from '@polkadot/util/u8a/fixLength';
import naclEncrypt from '@polkadot/util-crypto/nacl/encrypt';

import { PKCS8_DIVIDER, PKCS8_HEADER } from './defaults';

export default function encode (secretKey: Uint8Array, passphrase?: string): Uint8Array {
  const encoded = u8aConcat(
    PKCS8_HEADER,
    secretKey.subarray(0, 32),
    PKCS8_DIVIDER,
    secretKey.subarray(32, 64)
  );

  if (!passphrase) {
    return encoded;
  }

  const { encrypted, nonce } = naclEncrypt(encoded, u8aFixLength(stringToU8a(passphrase), 256, true));

  return u8aConcat(nonce, encrypted);
}
