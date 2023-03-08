// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';
import type { HexString } from '@polkadot/util/types';

import { bnToU8a, stringToU8a, u8aConcat } from '@polkadot/util';

import { blake2AsU8a } from '../blake2/asU8a.js';
import { BN_LE_16_OPTS } from '../bn.js';
import { decodeAddress } from './decode.js';

const PREFIX = stringToU8a('modlpy/utilisuba');

export function createKeyDerived (who: HexString | Uint8Array | string, index: bigint | BN | number): Uint8Array {
  return blake2AsU8a(
    u8aConcat(
      PREFIX,
      decodeAddress(who),
      bnToU8a(index, BN_LE_16_OPTS)
    )
  );
}
