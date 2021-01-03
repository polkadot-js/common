// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { assert, bnToU8a, u8aConcat } from '@polkadot/util';

import { EXPAND_OPT, secp256k1 } from './secp256k1';

export function secp256k1Expand (publicKey: Uint8Array): Uint8Array {
  assert([33, 65].includes(publicKey.length), 'Invalid publicKey provided');

  const expanded = secp256k1
    .keyFromPublic(publicKey)
    .getPublic();

  return u8aConcat(
    bnToU8a(expanded.getX(), EXPAND_OPT),
    bnToU8a(expanded.getY(), EXPAND_OPT)
  );
}
