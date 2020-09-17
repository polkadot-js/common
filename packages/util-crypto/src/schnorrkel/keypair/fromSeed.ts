// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Keypair } from '../../types';

import '../../polyfill';

import { sr25519KeypairFromSeed } from '@polkadot/wasm-crypto';

import keypairFromU8a from './fromU8a';

/**
 * @name schnorrkelKeypairFromSeed
 * @description Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
 */
export default function schnorrkelKeypairFromSeed (seed: Uint8Array): Keypair {
  return keypairFromU8a(
    sr25519KeypairFromSeed(seed)
  );
}
