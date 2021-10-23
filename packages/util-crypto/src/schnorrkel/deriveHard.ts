// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { sr25519DeriveKeypairHard } from '@polkadot/wasm-crypto';

import { createDeriveFn } from './derive';

export const schnorrkelDeriveHard = createDeriveFn(sr25519DeriveKeypairHard);
