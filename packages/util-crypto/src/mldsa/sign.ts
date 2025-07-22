// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types.js';

import { ml_dsa87 } from '@noble/post-quantum/ml-dsa.js';

import { u8aToU8a } from '@polkadot/util';

/**
 * @name mldsaSign
 * @summary Signs a message using the supplied secretKey
 * @description
 * Returns message signature of `message`, using the `secretKey`.
 * Uses ML-DSA-87 (highest security level) for post-quantum signature generation.
 * @example
 * <BR>
 *
 * ```javascript
 * import { mldsaSign } from '@polkadot/util-crypto';
 *
 * mldsaSign([...], [...]); // => [...]
 * ```
 */
export function mldsaSign (message: string | Uint8Array, { publicKey, secretKey }: Partial<Keypair>): Uint8Array {
  if (!secretKey) {
    throw new Error('Expected a valid secretKey');
  } else if (!publicKey) {
    throw new Error('Expected a valid publicKey');
  }

  const messageU8a = u8aToU8a(message);

  try {
    return ml_dsa87.sign(secretKey, messageU8a);
  } catch (error) {
    throw new Error(`MLDSA signing failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
