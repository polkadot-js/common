// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HashType } from './types.js';

import { blake2AsU8a } from '../blake2/index.js';
import { keccakAsU8a } from '../keccak/index.js';

export function hasher (hashType: HashType, data: Uint8Array | string, onlyJs?: boolean): Uint8Array {
  return hashType === 'keccak'
    ? keccakAsU8a(data, undefined, onlyJs)
    : blake2AsU8a(data, undefined, undefined, onlyJs);
}
