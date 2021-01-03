// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import { assert, bnToU8a } from '@polkadot/util';

import { EXPAND_OPT, secp256k1 } from '../secp256k1';

/**
 * @name secp256k1KeypairFromSeed
 * @description Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
 */
export function secp256k1KeypairFromSeed (seed: Uint8Array): Keypair {
  assert(seed.length === 32, 'Expected valid 32-byte private key as a seed');

  const key = secp256k1.keyFromPrivate(seed);

  return {
    publicKey: new Uint8Array(key.getPublic().encodeCompressed()),
    secretKey: bnToU8a(key.getPrivate(), EXPAND_OPT)
  };
}
