// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import ed25519 from 'tweeted25519';

/**
 * @name ed25519KeypairFromSecret
 * @summary Creates a new public/secret keypair from a secret.
 * @description
 * Returns a object containing a `publicKey` & `secretKey` generated from the supplied secret.
 * @example
 * <BR>
 *
 * ```javascript
 * import { ed25519KeypairFromSecret } from '@polkadot/util-crypto';
 *
 * ed25519KeypairFromSecret(...); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export function ed25519KeypairFromSecret (secret: Uint8Array): Keypair {
  return ed25519.sign.keyPair.fromSecretKey(secret);
}
