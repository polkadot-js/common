// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types';
import type { HashType } from './types';

import { assert, bnToU8a, u8aConcat } from '@polkadot/util';

import { secp256k1Hasher } from './hasher';
import { EXPAND_OPT, secp256k1 } from './secp256k1';

/**
 * @name secp256k1Sign
 * @description Returns message signature of `message`, using the supplied pair
 */
export function secp256k1Sign (message: Uint8Array | string, { secretKey }: Partial<Keypair>, hashType: HashType = 'blake2'): Uint8Array {
  assert(secretKey?.length === 32, 'Expected valid secp256k1 secretKey, 32-bytes');

  const key = secp256k1.keyFromPrivate(secretKey);
  const ecsig = key.sign(secp256k1Hasher(hashType, message));

  return u8aConcat(
    bnToU8a(ecsig.r, EXPAND_OPT),
    bnToU8a(ecsig.s, EXPAND_OPT),
    new Uint8Array([ecsig.recoveryParam || 0])
  );
}
