// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';

import { bnToU8a, compactToU8a, stringToU8a, u8aConcat, u8aSorted } from '@polkadot/util';

import { blake2AsU8a } from '../blake2/asU8a.js';
import { BN_LE_16_OPTS } from '../bn.js';
import { addressToU8a } from './util.js';

const PREFIX = stringToU8a('modlpy/utilisuba');

export function createKeyMulti (who: (string | Uint8Array)[], threshold: bigint | BN | number): Uint8Array {
  return blake2AsU8a(
    u8aConcat(
      PREFIX,
      compactToU8a(who.length),
      ...u8aSorted(who.map(addressToU8a)),
      bnToU8a(threshold, BN_LE_16_OPTS)
    )
  );
}
