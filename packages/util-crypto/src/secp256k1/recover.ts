// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HashType } from './types';

import { assert } from '@polkadot/util';
import { isReady, secp256k1Recover as wasm } from '@polkadot/wasm-crypto';

import { secp256k1Compress } from './compress';
import { secp256k1Expand } from './expand';
import { secp256k1 } from './secp256k1';

/**
 * @name secp256k1Recover
 * @description Recovers a publicKey from the supplied signature
 */
export function secp256k1Recover (message: Uint8Array, signature: Uint8Array, recovery: number, hashType: HashType = 'blake2', onlyJs?: boolean): Uint8Array {
  const publicKey = !onlyJs && isReady()
    ? wasm(message, signature, recovery)
    : new Uint8Array(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
      secp256k1
        .recoverPubKey(message, { r: signature.slice(0, 32), s: signature.slice(32, 64) }, recovery)
        .encode(null, true)
    );

  assert(publicKey, 'Unable to recover publicKey from signature');

  return hashType === 'keccak'
    ? secp256k1Expand(publicKey, onlyJs)
    : secp256k1Compress(publicKey, onlyJs);
}
