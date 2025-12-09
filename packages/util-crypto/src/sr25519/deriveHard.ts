// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as sr25519 from '@scure/sr25519';

import { createDeriveFn } from './derive.js';

// eslint-disable-next-line @typescript-eslint/unbound-method
export const sr25519DeriveHard = /*#__PURE__*/ createDeriveFn(sr25519.HDKD.secretHard);
