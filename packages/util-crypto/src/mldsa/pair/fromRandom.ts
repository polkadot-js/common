// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types.js';

import { randomAsU8a } from '../../random/asU8a.js';
import { MLDSA_SEED_LENGTH } from '../constants.js';
import { mldsaPairFromSeed } from './fromSeed.js';

/**
 * @name mldsaPairFromRandom
 * @summary Creates a new public/secret keypair from random bytes.
 * @description
 * Returns a object containing a `publicKey` & `secretKey` generated from random bytes.
 * Uses ML-DSA-87 (highest security level) for post-quantum signature generation.
 * @example
 * <BR>
 *
 * ```javascript
 * import { mldsaPairFromRandom } from '@polkadot/util-crypto';
 *
 * mldsaPairFromRandom(); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export function mldsaPairFromRandom (): Keypair {
  return mldsaPairFromSeed(randomAsU8a(MLDSA_SEED_LENGTH));
}
