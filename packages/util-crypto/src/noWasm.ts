// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

export function isReady (): boolean {
  // always false, when true it will try and use non-existent functions
  return false;
}

export function waitReady (): Promise<boolean> {
  // always immediate true, our process is done
  return Promise.resolve(true);
}
