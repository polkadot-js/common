// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import wasmCrypto from '@polkadot/wasm-crypto';

export function cryptoIsReady (): boolean {
  return wasmCrypto.isReady();
}

export function cryptoWaitReady (): Promise<boolean> {
  return wasmCrypto
    .waitReady()
    .then((): boolean => true)
    .catch((error): boolean => {
      console.error('Unable to initialize @polkadot/util-crypto', error);

      return false;
    });
}

// start init process immediately
cryptoWaitReady().catch((): void => {
  // shouldn't happen, logged above
});
