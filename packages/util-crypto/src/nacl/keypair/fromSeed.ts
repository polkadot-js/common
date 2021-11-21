// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import nacl from 'tweetnacl';

import { ed25519KeypairFromSeed, isReady } from '@polkadot/wasm-crypto';

/**
 * @name naclKeypairFromSeed
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
export function naclKeypairFromSeed (seed: Uint8Array, onlyJs?: boolean): Keypair {
  if (!onlyJs && isReady()) {
    const full = ed25519KeypairFromSeed(seed);

    return {
      publicKey: full.slice(32),
      secretKey: full.slice(0, 64)
    };
  }

  return nacl.sign.keyPair.fromSeed(seed);
}
