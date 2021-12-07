// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../../types';

import { stringToU8a } from '@polkadot/util';

import { blake2AsU8a } from '../../blake2/asU8a';
import { ed25519PairFromSeed } from './fromSeed';

/**
 * @name ed25519PairFromString
 * @summary Creates a new public/secret keypair from a string.
 * @description
 * Returns a object containing a `publicKey` & `secretKey` generated from the supplied string. The string is hashed and the value used as the input seed.
 * @example
 * <BR>
 *
 * ```javascript
 * import { ed25519PairFromString } from '@polkadot/util-crypto';
 *
 * ed25519PairFromString('test'); // => { secretKey: [...], publicKey: [...] }
 * ```
 */
export function ed25519PairFromString (value: string): Keypair {
  return ed25519PairFromSeed(
    blake2AsU8a(
      stringToU8a(value)
    )
  );
}
