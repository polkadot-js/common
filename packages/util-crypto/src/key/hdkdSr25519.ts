// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Keypair } from '../types';

import schnorrkelKeypairFromSeed from '../schnorrkel/keypair/fromSeed';
import schnorrkelDerivePrivate from '../schnorrkel/derivePrivate';
import schnorrkelDerivePublic from '../schnorrkel/derivePublic';
import DeriveJunction from './DeriveJunction';

export default function keyHdkdSr25519 ({ secretKey, publicKey }: Keypair, { chainCode, isSoft }: DeriveJunction): Keypair {
  if (isSoft) {
    return {
      publicKey: schnorrkelDerivePublic(publicKey, chainCode),
      secretKey
    };
  }

  return schnorrkelKeypairFromSeed(
    schnorrkelDerivePrivate(secretKey, chainCode)
  );
}
