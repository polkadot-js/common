// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeypairType, Keypair } from '../types';

import DeriveJunction from './DeriveJunction';
import keyHdkdEd15519 from './hdkdEd25519';
import keyHdkdSr15519 from './hdkdSr25519';
import keyHdkdEcdsa from './hdkdEcdsa';

const generators = {
  ecdsa: keyHdkdEcdsa,
  ed25519: keyHdkdEd15519,
  sr25519: keyHdkdSr15519
};

export default function keyFromPath (pair: Keypair, path: DeriveJunction[], type: KeypairType): Keypair {
  const keyHdkd = generators[type];

  return path.reduce((pair, junction): Keypair => {
    return keyHdkd(pair, junction);
  }, pair);
}
