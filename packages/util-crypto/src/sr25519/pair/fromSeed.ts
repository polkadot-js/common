// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types.js';

import * as sr25519 from '@scure/sr25519';

import { u8aToU8a } from '@polkadot/util';

/**
 * @name sr25519PairFromSeed
 * @description Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
 */
export function sr25519PairFromSeed (seed: string | Uint8Array): Keypair {
  const seedU8a = u8aToU8a(seed);

  if (seedU8a.length !== 32) {
    throw new Error(`Expected a seed matching 32 bytes, found ${seedU8a.length}`);
  }

  const sec = sr25519.secretFromSeed(seedU8a);
  const pub = sr25519.getPublicKey(sec);

  return {
    publicKey: pub,
    secretKey: sec
  };
}
