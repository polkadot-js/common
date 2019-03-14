// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Keypair, KeypairType } from '../types';

import DeriveJunction from './DeriveJunction';
import keyHdkdEd15519 from './hdkdEd25519';
import keyHdkdSr15519 from './hdkdSr25519';

export default function keyFromPath (keypair: Keypair, path: Array<DeriveJunction>, type: KeypairType): Keypair {
  return path.reduce((keypair, junction) => {
    return type === 'ed25519'
      ? keyHdkdEd15519(keypair, junction)
      : keyHdkdSr15519(keypair, junction);
  }, keypair);
}
