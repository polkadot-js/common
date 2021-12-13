// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Point } from '@noble/secp256k1';

import { assert, hasBigInt } from '@polkadot/util';
import { isReady, secp256k1Compress as wasm } from '@polkadot/wasm-crypto';

export function secp256k1Compress (publicKey: Uint8Array, onlyJs?: boolean): Uint8Array {
  if (publicKey.length === 33) {
    return publicKey;
  }

  assert(publicKey.length === 65, 'Invalid publicKey provided');

  return !hasBigInt || (!onlyJs && isReady())
    ? wasm(publicKey)
    : Point.fromHex(publicKey).toRawBytes(true);
}
