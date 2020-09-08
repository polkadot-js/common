// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import * as elliptic from 'elliptic';
import { assert, bnToU8a, u8aConcat } from '@polkadot/util';

const EC = elliptic.ec;
const ec = new EC('secp256k1');

export default function secp256k1Expand (publicKey: Uint8Array): Uint8Array {
  assert([33, 65].includes(publicKey.length), 'Invalid publicKey provided');

  const expanded = ec.keyFromPublic(publicKey).getPublic();

  return u8aConcat(
    bnToU8a(expanded.getX(), { bitLength: 256, isLe: false }),
    bnToU8a(expanded.getY(), { bitLength: 256, isLe: false })
  );
}
