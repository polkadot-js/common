// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert, bnToU8a, u8aConcat } from '@polkadot/util';
import { isReady, secp256k1Expand as wasm } from '@polkadot/wasm-crypto';

import { BN_BE_256_OPTS } from '../bn';
import { secp256k1 } from './secp256k1';

export function secp256k1Expand (publicKey: Uint8Array, onlyJs?: boolean): Uint8Array {
  if (publicKey.length === 65) {
    return publicKey;
  }

  assert(publicKey.length === 33, 'Invalid publicKey provided');

  if (!onlyJs && isReady()) {
    return wasm(publicKey);
  }

  const expanded = secp256k1
    .keyFromPublic(publicKey)
    .getPublic();

  return u8aConcat(
    bnToU8a(expanded.getX(), BN_BE_256_OPTS),
    bnToU8a(expanded.getY(), BN_BE_256_OPTS)
  );
}
