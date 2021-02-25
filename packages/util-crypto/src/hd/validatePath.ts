// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const HARDENED = 0x80000000;

export function hdValidatePath (path: string): boolean {
  if (!path.startsWith('m/')) {
    return false;
  }

  return !path
    .split('/')
    .slice(1)
    .map((n) => parseInt(n.replace("'", ''), 10))
    .some((n) => isNaN(n) && n < HARDENED);
}
