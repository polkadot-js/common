// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import * as nacl from 'tweetnacl';

/**
 * @name naclKeypairFromRandom
 * @summary Creates a new public/secret keypair.
 * @description
 * Returns a new generate object containing a `publicKey` & `secretKey`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclKeypairFromRandom } from '@polkadot/util-crypto';
 *
 * naclKeypairFromRandom(); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export function naclKeypairFromRandom (): Keypair {
  return nacl.sign.keyPair();
}
