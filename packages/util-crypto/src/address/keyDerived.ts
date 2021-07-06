// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';

import { bnToU8a, stringToU8a, u8aConcat } from '@polkadot/util';

import { blake2AsU8a } from '../blake2/asU8a';
import { decodeAddress } from './decode';

const PREFIX = stringToU8a('modlpy/utilisuba');

export function createKeyDerived (who: Uint8Array | string, index: BigInt | BN | number): Uint8Array {
  return blake2AsU8a(
    u8aConcat(
      PREFIX,
      decodeAddress(who),
      bnToU8a(index, { bitLength: 16, isLe: true })
    )
  );
}
