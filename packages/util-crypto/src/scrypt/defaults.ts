// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ScryptParams } from './types.js';

export const ALLOWED_PARAMS: ScryptParams[] = [
  { N: 1 << 13, r: 8, p: 10 },
  { N: 1 << 14, r: 8, p: 5 },
  { N: 1 << 15, r: 8, p: 3 },
  { N: 1 << 15, r: 8, p: 1 },
  { N: 1 << 16, r: 8, p: 2 },
  { N: 1 << 17, r: 8, p: 1 }
];

export const DEFAULT_PARAMS: ScryptParams = {
  N: 1 << 17,
  p: 1,
  r: 8
};
