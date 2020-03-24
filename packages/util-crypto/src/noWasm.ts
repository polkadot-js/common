// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export function isReady (): boolean {
  // always false, when true it will try and use non-existent functions
  return false;
}

export function waitReady (): Promise<boolean> {
  // always immediate true, our process is done
  return Promise.resolve(true);
}
