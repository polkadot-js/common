// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ScryptParams } from './types.js';

import { u8aToBn } from '@polkadot/util';

import { BN_LE_OPTS } from '../bn.js';
import { ALLOWED_PARAMS } from './defaults.js';

interface Result {
  params: ScryptParams,
  salt: Uint8Array;
}

export function scryptFromU8a (data: Uint8Array): Result {
  if (!(data instanceof Uint8Array)) {
    throw new Error('Expected input to be a Uint8Array');
  }

  // Ensure the input is exactly 44 bytes: 32 for salt + 3 * 4 for N, p, r
  if (data.length < 32 + 12) {
    throw new Error(`Invalid input length: expected 44 bytes, found ${data.length}`);
  }

  const salt = data.subarray(0, 32);
  const N = u8aToBn(data.subarray(32, 36), BN_LE_OPTS).toNumber();
  const p = u8aToBn(data.subarray(36, 40), BN_LE_OPTS).toNumber();
  const r = u8aToBn(data.subarray(40, 44), BN_LE_OPTS).toNumber();

  if (N > (1 << 20) || p > 4 || r > 16) {
    throw new Error('Scrypt parameters exceed safe limits');
  }

  const isAllowed = ALLOWED_PARAMS.some((preset) =>
    preset.N === N && preset.p === p && preset.r === r
  );

  if (!isAllowed) {
    throw new Error('Invalid injected scrypt params found');
  }

  return { params: { N, p, r }, salt };
}
