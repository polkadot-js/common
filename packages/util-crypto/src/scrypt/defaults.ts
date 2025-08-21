// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ScryptParams } from './types.js';

export const ALLOWED_PARAMS: ScryptParams[] = [
  { N: 1 << 13, p: 10, r: 8 },
  { N: 1 << 14, p: 5, r: 8 },
  { N: 1 << 15, p: 3, r: 8 },
  { N: 1 << 15, p: 1, r: 8 },
  { N: 1 << 16, p: 2, r: 8 },
  { N: 1 << 17, p: 1, r: 8 }
];

export const DEFAULT_PARAMS: ScryptParams = {
  N: 1 << 17,
  p: 1,
  r: 8
};
