// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ed25519DeriveHard, ed25519PairFromSeed } from '../ed25519';
import { createSeedDeriveFn } from './hdkdDerive';

export const keyHdkdEd25519 = createSeedDeriveFn(ed25519PairFromSeed, ed25519DeriveHard);
