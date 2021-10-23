// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { secp256k1DeriveHard } from '../secp256k1/deriveHard';
import { secp256k1KeypairFromSeed } from '../secp256k1/keypair/fromSeed';
import { createSeedDeriveFn } from './hdkdDerive';

export const keyHdkdEcdsa = createSeedDeriveFn(secp256k1KeypairFromSeed, secp256k1DeriveHard);
