// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Keypair } from '../types';

import { assert } from '@polkadot/util';

import naclDerivePrivate from '../nacl/derivePrivate';
import naclKeypairFromSeed from '../nacl/keypair/fromSeed';
import DeriveJunction from './DeriveJunction';

export default function keyHdkdEd25519 ({ secretKey }: Keypair, { chainCode, isHard }: DeriveJunction): Keypair {
  assert(isHard, 'A soft key was found in the path (and is unsupported)');

  return naclKeypairFromSeed(
    naclDerivePrivate(secretKey, chainCode)
  );
}
