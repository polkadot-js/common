// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isReady, waitReady } from '@polkadot/wasm-crypto';

export function wasmWaitReady (): Promise<boolean> {
  return waitReady();
}

export function wasmIsReady (): boolean {
  return isReady();
}
