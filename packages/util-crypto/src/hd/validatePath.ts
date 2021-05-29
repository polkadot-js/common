// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const HARDENED = 0x80000000;

export function hdValidatePath (path: string): boolean {
  if (!path.startsWith('m/')) {
    return false;
  }

  const parts = path.split('/').slice(1);

  return parts.every((n) => /^\d+'?$/.test(n)) && (
    !parts
      .map((n) => parseInt(n.replace(/'$/, ''), 10))
      .some((n) => isNaN(n) || (n >= HARDENED) || (n < 0))
  );
}
