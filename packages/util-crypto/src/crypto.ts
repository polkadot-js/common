// Copyright 2017-2022 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '@polkadot/util';
import { isReady, waitReady } from '@polkadot/wasm-crypto';

export const cryptoIsReady = isReady;

export function cryptoWaitReady (): Promise<boolean> {
  return waitReady()
    .then((): boolean => {
      assert(isReady(), 'Unable to initialize @polkadot/util-crypto');

      return true;
    })
    .catch(() => false);
}
