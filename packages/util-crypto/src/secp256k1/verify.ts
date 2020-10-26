// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { HashType } from './types';

import { ec as EC } from 'elliptic';
import { assert, u8aEq, u8aToU8a } from '@polkadot/util';

import secp256k1Expand from './expand';
import hasher from './hasher';

const ec = new EC('secp256k1');

/**
 * @name secp256k1Verify
 * @description Verifies the signature of `message`, using the supplied pair
 */
export default function secp256k1Verify (message: Uint8Array | string, signature: Uint8Array | string, address: Uint8Array | string, hashType: HashType = 'blake2', isExpanded = false): boolean {
  const u8a = u8aToU8a(signature);

  assert(u8a.length === 65, `Expected signature with 65 bytes, ${u8a.length} found instead`);

  const publicKey = new Uint8Array(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    ec.recoverPubKey(hasher(hashType, message), { r: u8a.slice(0, 32), s: u8a.slice(32, 64) }, u8a[64])
      .encodeCompressed()
  );

  return u8aEq(
    hasher(hashType, isExpanded ? secp256k1Expand(publicKey) : publicKey),
    u8aToU8a(address)
  );
}
