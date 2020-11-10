// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { HashType } from './types';

import { assert, u8aEq, u8aToU8a, u8aFixLength } from '@polkadot/util';

import { secp256k1Expand } from './expand';
import { secp256k1Hasher } from './hasher';
import { secp256k1 } from './secp256k1';

interface Options {
  hashType: HashType;
  isExpanded: boolean;
}

/**
 * @name secp256k1Verify
 * @description Verifies the signature of `message`, using the supplied pair
 */
export function secp256k1Verify (message: Uint8Array | string, signature: Uint8Array | string, address: Uint8Array | string, { hashType = 'blake2', isExpanded = false }: Partial<Options> = {}): boolean {
  const u8a = u8aToU8a(signature);

  assert(u8a.length === 65, `Expected signature with 65 bytes, ${u8a.length} found instead`);

  const publicKey = new Uint8Array(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    secp256k1
      .recoverPubKey(
        secp256k1Hasher(hashType, message),
        { r: u8a.slice(0, 32), s: u8a.slice(32, 64) },
        u8a[64]
      )
      .encodeCompressed()
  );

  const signingAddress: Uint8Array = secp256k1Hasher(hashType, isExpanded ? secp256k1Expand(publicKey) : publicKey);
  const inputAddress: Uint8Array = u8aToU8a(address);

  return hashType === 'keccak'
    ? u8aEq(
      u8aFixLength(signingAddress, 160),
      u8aFixLength(inputAddress, 160)
    )
    : u8aEq(
      signingAddress,
      inputAddress
    );
}
