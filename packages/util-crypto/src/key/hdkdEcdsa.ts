// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Keypair } from '../types';

import { assert } from '@polkadot/util';

import secp256k1DeriveHard from '../secp256k1/deriveHard';
import secp256k1KeypairFromSeed from '../secp256k1/keypair/fromSeed';
import DeriveJunction from './DeriveJunction';

export default function keyHdkdEcdsa (keypair: Keypair, { chainCode, isHard }: DeriveJunction): Keypair {
  assert(isHard, 'A soft key was found in the path (and is unsupported)');

  return secp256k1KeypairFromSeed(
    secp256k1DeriveHard(keypair.secretKey.subarray(0, 32), chainCode)
  );
}
