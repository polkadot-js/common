// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types.js';

import { u8aToU8a } from '@polkadot/util';
import { sr25519KeypairFromSeed } from '@polkadot/wasm-crypto';

import { sr25519PairFromU8a } from './fromU8a.js';

/**
 * @name sr25519PairFromSeed
 * @description Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
 */
export function sr25519PairFromSeed (seed: string | Uint8Array): Keypair {
  const seedU8a = u8aToU8a(seed);

  if (seedU8a.length !== 32) {
    throw new Error(`Expected a seed matching 32 bytes, found ${seedU8a.length}`);
  }

  return sr25519PairFromU8a(
    sr25519KeypairFromSeed(seedU8a)
  );
}
