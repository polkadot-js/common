// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { secp256k1DeriveHard } from '../secp256k1/deriveHard';
import { secp256k1KeypairFromSeed } from '../secp256k1/keypair/fromSeed';
import { keyHdkdDerive } from './hdkdDerive';

export const keyHdkdEcdsa = keyHdkdDerive(secp256k1KeypairFromSeed, secp256k1DeriveHard);
