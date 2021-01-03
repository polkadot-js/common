// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types';

import { schnorrkelDeriveHard } from '../schnorrkel/deriveHard';
import { schnorrkelDeriveSoft } from '../schnorrkel/deriveSoft';
import { DeriveJunction } from './DeriveJunction';

export function keyHdkdSr25519 (keypair: Keypair, { chainCode, isSoft }: DeriveJunction): Keypair {
  return isSoft
    ? schnorrkelDeriveSoft(keypair, chainCode)
    : schnorrkelDeriveHard(keypair, chainCode);
}
