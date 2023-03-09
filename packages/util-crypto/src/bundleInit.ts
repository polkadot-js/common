// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@polkadot/x-bigint/shim';

import { utils as utilsNobleSecp256k1 } from '@noble/secp256k1';

import { u8aConcat } from '@polkadot/util';

import { hmacSha256AsU8a } from './hmac/index.js';
import { cryptoWaitReady } from './crypto.js';

// Set overrides on the secp256k1 utils
//   - hmacShaSync - This needs to be set, unset by default
utilsNobleSecp256k1.hmacSha256Sync = (key: Uint8Array, ...messages: Uint8Array[]) =>
  hmacSha256AsU8a(key, u8aConcat(...messages));

// start init process immediately
cryptoWaitReady().catch((): void => {
  // shouldn't happen, logged and caught inside cryptoWaitReady
});
