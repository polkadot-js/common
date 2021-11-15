// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { HashType } from './types';

import { recoverPublicKey, Signature } from '@noble/secp256k1';

import { assert, u8aEq, u8aToU8a } from '@polkadot/util';

import { secp256k1Compress } from './compress';
import { secp256k1Expand } from './expand';
import { secp256k1Hasher } from './hasher';

/**
 * @name secp256k1Verify
 * @description Verifies the signature of `message`, using the supplied pair
 */
export function secp256k1Verify (message: HexString | Uint8Array | string, signature: HexString | Uint8Array | string, address: HexString | Uint8Array | string, hashType: HashType = 'blake2'): boolean {
  const isEthereum = hashType === 'keccak';
  const u8a = u8aToU8a(signature);

  assert(u8a.length === 65, `Expected signature with 65 bytes, ${u8a.length} found instead`);

  const publicKey = recoverPublicKey(
    secp256k1Hasher(hashType, message),
    Signature.fromCompact(u8aToU8a(signature).subarray(0, 64)).toRawBytes(),
    u8a[64]
  ) as Uint8Array;

  const signingAddress = secp256k1Hasher(
    hashType,
    (isEthereum
      ? secp256k1Expand
      : secp256k1Compress
    )(publicKey)
  );
  const inputAddress = u8aToU8a(address);

  // for Ethereum (keccak) the last 20 bytes is the address
  return isEthereum
    ? u8aEq(signingAddress.slice(-20), inputAddress.slice(-20))
    : u8aEq(signingAddress, inputAddress);
}
