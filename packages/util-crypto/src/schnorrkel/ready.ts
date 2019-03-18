// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import schnorrkel from '@polkadot/wasm-schnorrkel';

export default function schnorrkelWaitReady (): Promise<boolean> {
  return schnorrkel.waitReady();
}

export function schnorrkelIsReady (): boolean {
  return schnorrkel.isReady();
}
