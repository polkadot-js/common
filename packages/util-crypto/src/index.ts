// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import './polyfill';

import { wasmWaitReady } from './ready';
import { schnorrkelWaitReady } from './schnorrkel';

export * from './blake2';
export * from './keccak';
export * from './key';
export * from './mnemonic';
export * from './nacl';
export * from './random';
export * from './schnorrkel';
export * from './secp256k1';
export * from './sha512';
export * from './xxhash';

export function cryptoWaitReady (): Promise<boolean> {
  // this is a bit convoluted, but since we can do the same for libsodium,
  // prepare for multiples, easy to adapt without thinking
  return Promise
    .all([
      wasmWaitReady(),
      schnorrkelWaitReady()
    ])
    .then(() => true)
    .catch((error) => {
      console.error('Unable to initialize @polkadot/util-crypto', error);

      return false;
    });
}

// start init process immediately
cryptoWaitReady().catch(() => {
  // shouldn't happen, logged above
});
