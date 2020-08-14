// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Keypair } from '../../types';

import elliptic from 'elliptic';
import { assert, bnToU8a } from '@polkadot/util';

const EC = elliptic.ec;
const ec = new EC('secp256k1');

/**
 * @name secp256k1KeypairFromSeed
 * @description Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.
 */
export default function secp256k1KeypairFromSeed (seed: Uint8Array): Keypair {
  assert(seed.length === 32, 'Expected valid 32-byte private key as a seed');

  const key = ec.keyFromPrivate(seed);

  return {
    publicKey: new Uint8Array(key.getPublic().encodeCompressed()),
    secretKey: bnToU8a(key.getPrivate(), { bitLength: 256, isLe: false })
  };
}
