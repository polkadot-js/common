// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Keypair } from '../types';

import { u8aToU8a } from '@polkadot/util';

import { schnorrkelKeypairFromU8a } from './keypair/fromU8a';
import { schnorrkelKeypairToU8a } from './keypair/toU8a';

type DeriveFn = (pair: Uint8Array, cc: Uint8Array) => Uint8Array;

export function schnorrkelDerive (deriveFn: DeriveFn, keypair: Keypair, chainCode: HexString | Uint8Array | string): Keypair {
  return schnorrkelKeypairFromU8a(
    deriveFn(
      schnorrkelKeypairToU8a(keypair),
      u8aToU8a(chainCode)
    )
  );
}
