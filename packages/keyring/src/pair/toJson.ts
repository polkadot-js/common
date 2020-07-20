// Copyright 2017-2020 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeypairType } from '@polkadot/util-crypto/types';
import { KeyringPair$Json, KeyringPair$Meta } from '../types';

import { base64Encode } from '@polkadot/util-crypto';

interface PairStateJson {
  address: string;
  meta: KeyringPair$Meta;
}

// version 2 - nonce, encoded (previous)
// version 3 - salt, nonce, encoded

export default function toJson (type: KeypairType, { address, meta }: PairStateJson, encoded: Uint8Array, isEncrypted: boolean): KeyringPair$Json {
  return {
    address,
    encoded: base64Encode(encoded),
    encoding: {
      content: ['pkcs8', type],
      type: isEncrypted
        ? ['scrypt', 'xsalsa20-poly1305']
        : ['none'],
      version: '3'
    },
    meta
  };
}
