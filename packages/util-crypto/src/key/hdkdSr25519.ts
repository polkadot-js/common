// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Keypair } from '../types';

import schnorrkelDeriveHard from '../schnorrkel/deriveHard';
import schnorrkelDeriveSoft from '../schnorrkel/deriveSoft';
import DeriveJunction from './DeriveJunction';

export default function keyHdkdSr25519 (keypair: Keypair, { chainCode, isSoft }: DeriveJunction): Keypair {
  return isSoft
    ? schnorrkelDeriveSoft(keypair, chainCode)
    : schnorrkelDeriveHard(keypair, chainCode);
}
