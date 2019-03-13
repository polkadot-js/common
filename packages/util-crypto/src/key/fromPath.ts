// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeypairType } from '../types';

import DeriveJunction from './DeriveJunction';
import keyHdkdEd15519 from './hdkdEd25519';
import keyHdkdSr15519 from './hdkdSr25519';

export default function keyFromPath (seed: Uint8Array, path: Array<DeriveJunction>, type: KeypairType): Uint8Array {
  return path.reduce((seed, junction) => {
    return type === 'ed25519'
      ? keyHdkdEd15519(seed, junction)
      : keyHdkdSr15519(seed, junction);
  }, seed);
}
