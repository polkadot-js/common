// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Keypair } from '../types';
import { assert, u8aToU8a, u8aConcat } from '@polkadot/util';
import { blake2AsU8a } from '../blake2';
import elliptic from 'elliptic';

const EC = elliptic.ec;
const ec = new EC('secp256k1');

/**
 * @name secp256k1Sign
 * @description Returns message signature of `message`, using the supplied pair
 */
export default function secp256k1Sign (message: Uint8Array | string, { secretKey }: Partial<Keypair>): Uint8Array {
  assert(secretKey?.length === 32, 'Expected valid secp256k1 secretKey, 32-bytes');

  const messageHash = blake2AsU8a(u8aToU8a(message), 256);
  const key = ec.keyFromPrivate(secretKey);
  const ecsig = key.sign(messageHash);
  const rParam = new Uint8Array(ecsig.r.toArray());
  const sParam = new Uint8Array(ecsig.s.toArray());
  const recoveryParam = Uint8Array.of(ecsig.recoveryParam || 0);

  return u8aConcat(rParam, sParam, recoveryParam);
}
