// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { secp256k1 } from '@noble/curves/secp256k1';

import { hasBigInt } from '@polkadot/util';
import { isReady, secp256k1Compress as wasm } from '@polkadot/wasm-crypto';

export function secp256k1Compress (publicKey: Uint8Array, onlyJs?: boolean): Uint8Array {
  if (![33, 65].includes(publicKey.length)) {
    throw new Error(`Invalid publicKey provided, received ${publicKey.length} bytes input`);
  }

  if (publicKey.length === 33) {
    return publicKey;
  }

  return !hasBigInt || (!onlyJs && isReady())
    ? wasm(publicKey)
    : secp256k1.ProjectivePoint.fromHex(publicKey).toRawBytes(true);
}
