// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import nacl from 'tweetnacl';

/**
 * @name ed25519PairFromRandom
 * @summary Creates a new public/secret keypair.
 * @description
 * Returns a new generate object containing a `publicKey` & `secretKey`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { ed25519PairFromRandom } from '@polkadot/util-crypto';
 *
 * ed25519PairFromRandom(); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export function ed25519PairFromRandom (): Keypair {
  return nacl.sign.keyPair();
}
