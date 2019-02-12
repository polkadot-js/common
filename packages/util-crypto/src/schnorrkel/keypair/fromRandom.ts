// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeypairType } from '../../types';

import randomAsU8a from '../../random/asU8a';
import fromSeed from './fromSeed';

/**
 * @name schnorrkelKeypairFromRandom
 * @description Returns a new generate object containing a `publicKey` & `secretKey`.
 */
export default function schnorrkelKeypairFromRandom (): KeypairType {
  return fromSeed(randomAsU8a(32));
}
