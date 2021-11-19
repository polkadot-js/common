// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { utils as utilsNobleSecp256k1 } from '@noble/secp256k1';

import { hmacSha256 } from './hmac/sha256';
import { randomAsU8a } from './random/asU8a';
import { cryptoWaitReady } from './crypto';

// Set overrides on the secp256k1 utils
//   - hmacShaSync - This needs to be set, unset by default
//   - randomBytes - Use our implementation for full platform support
utilsNobleSecp256k1.hmacSha256Sync = hmacSha256;
utilsNobleSecp256k1.randomBytes = randomAsU8a;

// start init process immediately
cryptoWaitReady().catch((): void => {
  // shouldn't happen, logged above
});
