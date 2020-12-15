// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isReady, waitReady } from '@polkadot/wasm-crypto';

export function cryptoIsReady (): boolean {
  return isReady();
}

export function cryptoWaitReady (): Promise<boolean> {
  return waitReady()
    .then((): boolean => true)
    .catch((error): boolean => {
      console.error('Unable to initialize @polkadot/util-crypto', error);

      return false;
    });
}
