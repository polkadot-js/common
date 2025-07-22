// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types.js';

import { ml_dsa87 } from '@noble/post-quantum/ml-dsa.js';

import { MLDSA_SECRET_KEY_LENGTH } from '../constants.js';

/**
 * @name mldsaPairFromSecret
 * @summary Creates a new public/secret keypair from a secret key.
 * @description
 * Returns a object containing a `publicKey` & `secretKey` generated from the supplied secret key.
 * For MLDSA, the secret key typically contains sufficient information to derive the public key.
 * Uses ML-DSA-87 (highest security level) for post-quantum signature generation.
 * @example
 * <BR>
 *
 * ```javascript
 * import { mldsaPairFromSecret } from '@polkadot/util-crypto';
 *
 * mldsaPairFromSecret([...]); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export function mldsaPairFromSecret (secretKey: Uint8Array): Keypair {
  if (secretKey.length !== MLDSA_SECRET_KEY_LENGTH) {
    throw new Error(`Invalid secretKey length, expected ${MLDSA_SECRET_KEY_LENGTH} bytes, received ${secretKey.length}`);
  }

  // For MLDSA, we need to derive the public key from the secret key
  // Since the noble library doesn't provide a direct method for this,
  // we'll need to regenerate the keypair from the seed that's typically
  // embedded in the secret key structure.

  // MLDSA secret keys typically contain the seed used for generation
  // Extract the first 32 bytes as seed (this follows the MLDSA spec)
  const seed = secretKey.slice(0, 32);

  try {
    // Regenerate the keypair from the embedded seed
    const keys = ml_dsa87.keygen(seed);

    // Verify that the regenerated secret key matches the input
    if (keys.secretKey.length === secretKey.length) {
      // Compare the keys to ensure they match
      let isMatch = true;
      for (let i = 0; i < secretKey.length; i++) {
        if (keys.secretKey[i] !== secretKey[i]) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        return {
          publicKey: keys.publicKey,
          secretKey: keys.secretKey
        };
      }
    }

    // If regeneration doesn't match, the secret key format might be different
    throw new Error('Unable to derive public key from secret key - invalid secret key format');
  } catch (error) {
    throw new Error(`Failed to derive MLDSA keypair from secret: ${error instanceof Error ? error.message : String(error)}`);
  }
}
