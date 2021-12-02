// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert } from '@polkadot/util';
import { isReady, secp256k1Compress as wasm } from '@polkadot/wasm-crypto';

import { secp256k1 } from './secp256k1';

export function secp256k1Compress (publicKey: Uint8Array, onlyJs?: boolean): Uint8Array {
  if (publicKey.length === 33) {
    return publicKey;
  }

  assert(publicKey.length === 65, 'Invalid publicKey provided');

  return !onlyJs && isReady()
    ? wasm(publicKey)
    : new Uint8Array(
      secp256k1
        .keyFromPublic(publicKey)
        .getPublic()
        .encodeCompressed()
    );
}
