// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types';

import { sr25519DeriveHard } from '../25519sr/deriveHard';
import { sr25519DeriveSoft } from '../25519sr/deriveSoft';
import { DeriveJunction } from './DeriveJunction';

export function keyHdkdSr25519 (keypair: Keypair, { chainCode, isSoft }: DeriveJunction): Keypair {
  return isSoft
    ? sr25519DeriveSoft(keypair, chainCode)
    : sr25519DeriveHard(keypair, chainCode);
}
