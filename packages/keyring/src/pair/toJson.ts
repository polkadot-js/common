// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { KeyringPair$Json } from '../types';
import { PairState } from './types';

import u8aToHex from '@polkadot/util/u8a/toHex';

export default function toJson ({ address, meta }: PairState, encoded: Uint8Array, isEncrypted: boolean): KeyringPair$Json {
  return {
    address,
    encoded: u8aToHex(encoded),
    encoding: {
      content: 'pkcs8',
      type: isEncrypted
        ? 'xsalsa20-poly1305'
        : 'none',
      version: '0'
    },
    meta: {
      ...meta
    }
  };
}
