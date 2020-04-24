// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';
import { bnToU8a, compactToU8a, isUndefined, u8aConcat } from '@polkadot/util';

import blake2AsU8a from '../blake2/asU8a';
import decodeAddress from './decode';

export function sortU8a (u8as: Uint8Array[]): Uint8Array[] {
  return u8as.sort((a, b): number => {
    let i = 0;

    while (true) {
      if (isUndefined(a[i]) && isUndefined(b[i])) {
        return 0;
      } else if (isUndefined(a[i])) {
        return -1;
      } else if (isUndefined(b[i])) {
        return 1;
      }

      const cmp = a[i] - b[i];

      if (cmp !== 0) {
        return cmp;
      }

      i++;
    }
  });
}

export default function createKeyMulti (who: (Uint8Array | string)[], index: BigInt | BN | number): Uint8Array {
  return blake2AsU8a(
    u8aConcat(
      'modlpy/utilisuba',
      compactToU8a(who.length),
      ...sortU8a(who.map((who) => decodeAddress(who))),
      bnToU8a(index, { bitLength: 16, isLe: true })
    )
  );
}
