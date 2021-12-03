// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HashType } from './types';

import { assert, hasBigInt } from '@polkadot/util';
import { isReady, secp256k1Recover as wasm } from '@polkadot/wasm-crypto';
import { recoverPublicKey, Signature } from '@polkadot/x-noble-secp256k1';

import { secp256k1Compress } from './compress';
import { secp256k1Expand } from './expand';

/**
 * @name secp256k1Recover
 * @description Recovers a publicKey from the supplied signature
 */
export function secp256k1Recover (message: Uint8Array, signature: Uint8Array, recovery: number, hashType: HashType = 'blake2', onlyJs?: boolean): Uint8Array {
  const publicKey = !hasBigInt || (!onlyJs && isReady())
    ? wasm(message, signature.slice(0, 64), recovery)
    : recoverPublicKey(
      message,
      Signature.fromCompact(signature.subarray(0, 64)).toRawBytes(),
      recovery
    );

  assert(publicKey, 'Unable to recover publicKey from signature');

  return hashType === 'keccak'
    ? secp256k1Expand(publicKey, onlyJs)
    : secp256k1Compress(publicKey, onlyJs);
}
