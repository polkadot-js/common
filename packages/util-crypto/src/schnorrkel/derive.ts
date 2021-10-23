// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Keypair } from '../types';

import { u8aToU8a } from '@polkadot/util';

import { schnorrkelKeypairFromU8a } from './keypair/fromU8a';
import { schnorrkelKeypairToU8a } from './keypair/toU8a';

export function createDeriveFn (derive: (pair: Uint8Array, cc: Uint8Array) => Uint8Array): (keypair: Keypair, chainCode: HexString | Uint8Array | string) => Keypair {
  return (keypair: Keypair, chainCode: HexString | Uint8Array | string) =>
    schnorrkelKeypairFromU8a(
      derive(
        schnorrkelKeypairToU8a(keypair),
        u8aToU8a(chainCode)
      )
    );
}
