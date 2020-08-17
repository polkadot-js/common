// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import elliptic from 'elliptic';
import { bnToU8a, u8aConcat } from '@polkadot/util';

import sanitizePublic from './sanitizePublic';

const EC = elliptic.ec;
const ec = new EC('secp256k1');

export default function secp256k1Expand (publicKey: Uint8Array): Uint8Array {
  const expanded = ec.keyFromPublic(sanitizePublic(publicKey)).getPublic();

  return u8aConcat(
    bnToU8a(expanded.getX(), { bitLength: 256, isLe: false }),
    bnToU8a(expanded.getY(), { bitLength: 256, isLe: false })
  );
}
