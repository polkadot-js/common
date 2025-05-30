// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const HARDENED = 0x80000000;

export function hdValidatePath (path: string): boolean {
  if (!path.startsWith('m/')) {
    return false;
  }

  const parts = path.split('/').slice(1);

  for (const p of parts) {
    const n = /^\d+'?$/.test(p)
      ? parseInt(p.replace(/'$/, ''), 10)
      : Number.NaN;

    if (isNaN(n) || (n >= HARDENED) || (n < 0)) {
      return false;
    }
  }

  return true;
}
