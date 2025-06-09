// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ScryptParams } from './types.js';

export const DEFAULT_PARAMS: ScryptParams = {
  N: 1 << 16,
  p: 2,
  r: 8
};
