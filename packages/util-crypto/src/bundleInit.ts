// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '@polkadot/x-bigint/shim';

import { cryptoWaitReady } from './crypto.js';

// start init process immediately
cryptoWaitReady().catch((): void => {
  // shouldn't happen, logged and caught inside cryptoWaitReady
});
