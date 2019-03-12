// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert } from '@polkadot/util/index';

import DeriveJunction from './DeriveJunction';
import keyHdkdEd15519 from './hdkdEd25519';

export default function keyDerive (seed: Uint8Array, path: Array<DeriveJunction>): Uint8Array {
  return path.reduce((seed, entry) => {
    assert(entry.isHard, 'A soft key was found in the path (and is unsupported)');

    return keyHdkdEd15519(seed, entry.data);
  }, seed);
}
