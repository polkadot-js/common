// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HashType } from './types';

import { blake2AsU8a } from '../blake2';
import { keccakAsU8a } from '../keccak';

export function hasher (hashType: HashType, data: Uint8Array | string, onlyJs?: boolean): Uint8Array {
  return hashType === 'keccak'
    ? keccakAsU8a(data, undefined, onlyJs)
    : blake2AsU8a(data, undefined, undefined, onlyJs);
}
