// Copyright 2017-2024 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeypairType } from '@polkadot/util-crypto/types';
import type { KeyringPair$Json, KeyringPair$Meta } from '../types.js';

import { objectSpread } from '@polkadot/util';
import { jsonEncryptFormat } from '@polkadot/util-crypto';

interface PairStateJson {
  address: string;
  meta: KeyringPair$Meta;
}

export function pairToJson (type: KeypairType, { address, meta }: PairStateJson, encoded: Uint8Array, isEncrypted: boolean): KeyringPair$Json {
  return objectSpread(jsonEncryptFormat(encoded, ['pkcs8', type], isEncrypted), {
    address,
    meta
  });
}
