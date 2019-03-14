// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { PairInfo } from './types';

import { stringToU8a, u8aConcat, u8aFixLength, assert } from '@polkadot/util';
import { naclEncrypt } from '@polkadot/util-crypto';

import { PKCS8_DIVIDER, PKCS8_HEADER } from './defaults';

export default function encode ({ publicKey, seed }: PairInfo, passphrase?: string): Uint8Array {
  assert(seed, 'Expected a valid seed to be passed to encode');

  const encoded = u8aConcat(
    PKCS8_HEADER,
    seed as Uint8Array,
    PKCS8_DIVIDER,
    publicKey
  );

  if (!passphrase) {
    return encoded;
  }

  const { encrypted, nonce } = naclEncrypt(encoded, u8aFixLength(stringToU8a(passphrase), 256, true));

  return u8aConcat(nonce, encrypted);
}
