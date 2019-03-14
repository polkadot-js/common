// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert } from '@polkadot/util';

import schnorrkel from '@polkadot/schnorrkel-js';

/**
 * @name schnorrkelSecretFromSeed
 * @description Returns a full 64-byte secretKey from the seed
 */
export default function schnorrkelSecretFromSeed (seed: Uint8Array): Uint8Array {
  assert(seed && seed.length === 32, 'Expected valid seed, 32-bytes');

  return schnorrkel.secretFromSeed(seed);
}
