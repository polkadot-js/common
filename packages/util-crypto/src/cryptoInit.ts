// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aConcat } from '@polkadot/util';
import { utils as utilsNobleSecp256k1 } from '@polkadot/x-noble-secp256k1';

import { randomAsU8a } from './random/asU8a';
import { cryptoWaitReady } from './crypto';
import { hmacSha256AsU8a } from './hmac';

// Set overrides on the secp256k1 utils
//   - hmacShaSync - This needs to be set, unset by default
//   - randomBytes - Use our implementation for full platform support
utilsNobleSecp256k1.hmacSha256Sync = (key: Uint8Array, ...messages: Uint8Array[]) =>
  hmacSha256AsU8a(key, u8aConcat(...messages));
utilsNobleSecp256k1.randomBytes = randomAsU8a;

// start init process immediately
cryptoWaitReady().catch((): void => {
  // shouldn't happen, logged above
});
