// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Keypair } from '../../types';

import { sr25519KeypairFromSeed } from '@polkadot/wasm-crypto';

import { schnorrkelKeypairFromU8a } from './fromU8a';

/**
 * @name schnorrkelKeypairFromSeed
 * @description Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
 */
export function schnorrkelKeypairFromSeed (seed: Uint8Array): Keypair {
  return schnorrkelKeypairFromU8a(
    sr25519KeypairFromSeed(seed)
  );
}
