// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types.js';

import { isU8a } from '@polkadot/util';

import { sr25519PairFromU8a } from './pair/fromU8a.js';
import { sr25519KeypairToU8a } from './pair/toU8a.js';

export function createDeriveFn (derive: (pair: Uint8Array, cc: Uint8Array) => Uint8Array): (keypair: Keypair, chainCode: Uint8Array) => Keypair {
  return (keypair: Keypair, chainCode: Uint8Array): Keypair => {
    if (!isU8a(chainCode) || chainCode.length !== 32) {
      throw new Error('Invalid chainCode passed to derive');
    }

    return sr25519PairFromU8a(
      derive(sr25519KeypairToU8a(keypair), chainCode)
    );
  };
}
