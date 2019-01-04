// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeypairType } from '../../types';

import nacl from 'tweetnacl';

/**
 * @name naclKeypairFromSeed
 * @signature naclKeypairFromSeed (seed: Uint8Array): { secretKey: Uint8Array, publicKey: Uint8Array }
 * @summary Creates a new public/secret keypair from a seed.
 * @description
 * Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclKeypairFromSeed } from '@polkadot/util-crypto';
 *
 * naclKeypairFromSeed(...); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export default function naclKeypairFromSeed (seed: Uint8Array): KeypairType {
  return nacl.sign.keyPair.fromSeed(seed);
}
