// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { HashType } from './types';

import elliptic from 'elliptic';
import { assert, u8aToU8a } from '@polkadot/util';

import secp256k1Expand from './expand';
import hasher from './hasher';

const EC = elliptic.ec;
const ec = new EC('secp256k1');

/**
 * @name secp256k1Verify
 * @description Verifies the signature of `message`, using the supplied pair
 */
export default function secp256k1Verify (message: Uint8Array | string, signature: Uint8Array | string, address: Uint8Array | string, hashType: HashType = 'blake2'): boolean {
  const signatureU8a = u8aToU8a(signature);

  assert(signatureU8a.length === 65, `Expected signature with 65 bytes, ${signatureU8a.length} found instead`);

  const sig = {
    r: signatureU8a.slice(0, 32),
    s: signatureU8a.slice(32, 64)
  };
  const recovery = signatureU8a[64];
  const publicKey = new Uint8Array(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    ec.recoverPubKey(hasher(hashType, message), sig, recovery)
      .encodeCompressed()
  );
  const hashData = hashType === 'keccak'
    ? secp256k1Expand(publicKey)
    : publicKey;

  return Buffer.compare(hasher(hashType, hashData), u8aToU8a(address)) === 0;
}
