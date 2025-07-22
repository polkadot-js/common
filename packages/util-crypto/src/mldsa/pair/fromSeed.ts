// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types.js';

import { ml_dsa87 } from '@noble/post-quantum/ml-dsa.js';

import { MLDSA_SEED_LENGTH } from '../constants.js';

/**
 * @name mldsaPairFromSeed
 * @summary Creates a new public/secret keypair from a seed.
 * @description
 * Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
 * Uses ML-DSA-87 (highest security level) for post-quantum signature generation.
 * @example
 * <BR>
 *
 * ```javascript
 * import { mldsaPairFromSeed } from '@polkadot/util-crypto';
 *
 * mldsaPairFromSeed(...); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export function mldsaPairFromSeed (seed: Uint8Array): Keypair {
  if (seed.length !== MLDSA_SEED_LENGTH) {
    throw new Error(`Invalid seed length, expected ${MLDSA_SEED_LENGTH} bytes, received ${seed.length}`);
  }

  const keys = ml_dsa87.keygen(seed);

  return {
    publicKey: keys.publicKey,
    secretKey: keys.secretKey
  };
}
