// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types';

import { assert, isU8a } from '@polkadot/util';

import { schnorrkelKeypairFromU8a } from './keypair/fromU8a';
import { schnorrkelKeypairToU8a } from './keypair/toU8a';

export function createDeriveFn (derive: (pair: Uint8Array, cc: Uint8Array) => Uint8Array): (keypair: Keypair, chainCode: Uint8Array) => Keypair {
  return (keypair: Keypair, chainCode: Uint8Array): Keypair => {
    assert(isU8a(chainCode) && chainCode.length === 32, 'Invalid chainCode passed to derive');

    return schnorrkelKeypairFromU8a(
      derive(schnorrkelKeypairToU8a(keypair), chainCode)
    );
  };
}
