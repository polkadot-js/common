// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Point } from '@noble/secp256k1';

import { assert, bnToU8a, u8aConcat } from '@polkadot/util';

import { BN_BE_256_OPTS } from '../bn';

export function secp256k1Expand (publicKey: Uint8Array): Uint8Array {
  assert([33, 65].includes(publicKey.length), 'Invalid publicKey provided');

  const { x, y } = Point.fromHex(publicKey);

  return u8aConcat(
    bnToU8a(x, BN_BE_256_OPTS),
    bnToU8a(y, BN_BE_256_OPTS)
  );
}
