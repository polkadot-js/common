// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { naclDeriveHard } from '../nacl/deriveHard';
import { naclKeypairFromSeed } from '../nacl/keypair/fromSeed';
import { createSeedDeriveFn } from './hdkdDerive';

export const keyHdkdEd25519 = createSeedDeriveFn(naclKeypairFromSeed, naclDeriveHard);
