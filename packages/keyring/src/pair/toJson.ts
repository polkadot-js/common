// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringPair$Json } from '../types';
import { PairState } from './types';

import { u8aToHex } from '@polkadot/util/index';

import { encodeAddress } from '../address';

export default function toJson ({ publicKey, meta }: PairState, encoded: Uint8Array, isEncrypted: boolean): KeyringPair$Json {
  return {
    address: encodeAddress(publicKey),
    encoded: u8aToHex(encoded),
    encoding: {
      content: 'pkcs8',
      type: isEncrypted
        ? 'xsalsa20-poly1305'
        : 'none',
      version: '0'
    },
    meta
  };
}
