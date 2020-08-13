// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { HashType } from './types';

import { u8aToU8a } from '@polkadot/util';

import { blake2AsU8a } from '../blake2';
import { keccakAsU8a } from '../keccak';

const HASH_TYPES = ['blake2', 'keccak'];

export default function secp256k1Hasher (hashType: HashType, data: Uint8Array | string): Uint8Array {
  const u8a = u8aToU8a(data);

  if (hashType === 'blake2') {
    return blake2AsU8a(u8a);
  } else if (hashType === 'keccak') {
    return keccakAsU8a(u8a);
  }

  throw new Error(`Unsupported secp256k1 hasher '${hashType as string}', expected one of ${HASH_TYPES.join(', ')}`);
}
