// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import ed25519 from 'tweeted25519';

/**
 * @name ed25519KeypairFromRandom
 * @summary Creates a new public/secret keypair.
 * @description
 * Returns a new generate object containing a `publicKey` & `secretKey`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { ed25519KeypairFromRandom } from '@polkadot/util-crypto';
 *
 * ed25519KeypairFromRandom(); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export function ed25519KeypairFromRandom (): Keypair {
  return ed25519.sign.keyPair();
}
