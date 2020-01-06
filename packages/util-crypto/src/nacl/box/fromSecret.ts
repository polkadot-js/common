// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Keypair } from '../../types';

import nacl from 'tweetnacl';

/**
 * @name naclBoxKeypairFromSecret
 * @summary Creates a new public/secret box keypair from a secret.
 * @description
 * Returns a object containing a box `publicKey` & `secretKey` generated from the supplied secret.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclBoxKeypairFromSecret } from '@polkadot/util-crypto';
 *
 * naclBoxKeypairFromSecret(...); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export default function naclBoxKeypairFromSecret (secret: Uint8Array): Keypair {
  return nacl.box.keyPair.fromSecretKey(secret.slice(0, 32));
}
