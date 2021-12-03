// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import { assert, bnToU8a } from '@polkadot/util';
import { isReady, secp256k1FromSeed } from '@polkadot/wasm-crypto';

import { BN_BE_256_OPTS } from '../../bn';
import { secp256k1 } from '../secp256k1';

/**
 * @name secp256k1PairFromSeed
 * @description Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
 */
export function secp256k1PairFromSeed (seed: Uint8Array, onlyJs?: boolean): Keypair {
  assert(seed.length === 32, 'Expected valid 32-byte private key as a seed');

  if (!onlyJs && isReady()) {
    const full = secp256k1FromSeed(seed);

    return {
      publicKey: full.slice(32),
      secretKey: full.slice(0, 32)
    };
  }

  const key = secp256k1.keyFromPrivate(seed);

  return {
    publicKey: new Uint8Array(key.getPublic().encodeCompressed()),
    secretKey: bnToU8a(key.getPrivate(), BN_BE_256_OPTS)
  };
}
