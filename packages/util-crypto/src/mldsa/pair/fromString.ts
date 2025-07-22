// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types.js';

import { stringToU8a } from '@polkadot/util';

import { blake2AsU8a } from '../../blake2/asU8a.js';
import { mldsaPairFromSeed } from './fromSeed.js';

/**
 * @name mldsaPairFromString
 * @summary Creates a new public/secret keypair from a string.
 * @description
 * Returns a object containing a `publicKey` & `secretKey` generated from the supplied string.
 * The string is first hashed using BLAKE2b to create a 32-byte seed.
 * Uses ML-DSA-87 (highest security level) for post-quantum signature generation.
 * @example
 * <BR>
 *
 * ```javascript
 * import { mldsaPairFromString } from '@polkadot/util-crypto';
 *
 * mldsaPairFromString('test'); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export function mldsaPairFromString (value: string): Keypair {
  return mldsaPairFromSeed(
    blake2AsU8a(stringToU8a(value), 256)
  );
}
