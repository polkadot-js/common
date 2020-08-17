// Copyright 2017-2020 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeypairType } from '@polkadot/util-crypto/types';
import { KeyringPair$Json, KeyringPair$JsonEncodingTypes, KeyringPair$Meta } from '../types';

import { base64Encode } from '@polkadot/util-crypto';

import { ENCODING } from './defaults';

interface PairStateJson {
  address: string;
  meta: KeyringPair$Meta;
}

// version 2 - nonce, encoded (previous)
// version 3 - salt, nonce, encoded
const VERSION = '3';

const ENC_NONE: KeyringPair$JsonEncodingTypes[] = ['none'];

export default function toJson (type: KeypairType, { address, meta }: PairStateJson, encoded: Uint8Array, isEncrypted: boolean): KeyringPair$Json {
  return {
    address,
    encoded: base64Encode(encoded),
    encoding: {
      content: ['pkcs8', type],
      type: isEncrypted
        ? ENCODING
        : ENC_NONE,
      version: VERSION
    },
    meta
  };
}
