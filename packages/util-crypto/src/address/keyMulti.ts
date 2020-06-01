// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';
import { bnToU8a, compactToU8a, stringToU8a, u8aConcat, u8aSorted } from '@polkadot/util';

import blake2AsU8a from '../blake2/asU8a';
import decodeAddress from './decode';

const PREFIX = stringToU8a('modlpy/utilisuba');

export default function createKeyMulti (who: (Uint8Array | string)[], threshold: BigInt | BN | number): Uint8Array {
  return blake2AsU8a(
    u8aConcat(
      PREFIX,
      compactToU8a(who.length),
      ...u8aSorted(who.map((who) => decodeAddress(who))),
      bnToU8a(threshold, { bitLength: 16, isLe: true })
    )
  );
}
