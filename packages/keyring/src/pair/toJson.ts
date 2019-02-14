// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringPair$Json, KeyringPair$Meta, KeyringPairType } from '../types';

import { u8aToHex } from '@polkadot/util/index';

import { encodeAddress } from '../address';

type PairStateJson = KeyringPair$Meta & {
  publicKey: Uint8Array
};

export default function toJson (type: KeyringPairType, { publicKey, meta }: PairStateJson, encoded: Uint8Array, isEncrypted: boolean): KeyringPair$Json {
  return {
    address: encodeAddress(publicKey),
    encoded: u8aToHex(encoded),
    encoding: {
      content: ['pkcs8', type],
      type: isEncrypted
        ? 'xsalsa20-poly1305'
        : 'none',
      version: '1'
    },
    meta
  };
}
