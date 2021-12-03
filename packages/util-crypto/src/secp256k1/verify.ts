// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { HashType } from './types';

import { assert, u8aEq, u8aToU8a } from '@polkadot/util';

import { hasher } from './hasher';
import { secp256k1Recover } from './recover';

/**
 * @name secp256k1Verify
 * @description Verifies the signature of `message`, using the supplied pair
 */
export function secp256k1Verify (msgHash: HexString | Uint8Array | string, signature: HexString | Uint8Array | string, address: HexString | Uint8Array | string, hashType: HashType = 'blake2', onlyJs?: boolean): boolean {
  const sig = u8aToU8a(signature);

  assert(sig.length === 65, `Expected signature with 65 bytes, ${sig.length} found instead`);

  const publicKey = secp256k1Recover(hasher(hashType, msgHash), sig, sig[64], hashType, onlyJs);
  const signerAddr = hasher(hashType, publicKey, onlyJs);
  const inputAddr = u8aToU8a(address);

  // for Ethereum (keccak) the last 20 bytes is the address
  return u8aEq(publicKey, inputAddr) || (
    hashType === 'keccak'
      ? u8aEq(signerAddr.slice(-20), inputAddr.slice(-20))
      : u8aEq(signerAddr, inputAddr)
  );
}
