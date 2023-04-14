// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { sr25519DeriveKeypairHard } from '@polkadot/wasm-crypto';

import { createDeriveFn } from './derive.js';

export const sr25519DeriveHard = /*#__PURE__*/ createDeriveFn(sr25519DeriveKeypairHard);
