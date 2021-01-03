// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HashType } from './types';

import { blake2AsU8a } from '../blake2';
import { keccakAsU8a } from '../keccak';

const HASH_TYPES = ['blake2', 'keccak'];

export function secp256k1Hasher (hashType: HashType, data: Uint8Array | string): Uint8Array {
  if (hashType === 'blake2') {
    return blake2AsU8a(data);
  } else if (hashType === 'keccak') {
    return keccakAsU8a(data);
  }

  throw new Error(`Unsupported secp256k1 hasher '${hashType as string}', expected one of ${HASH_TYPES.join(', ')}`);
}
