// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import elliptic from 'elliptic';

import sanitizePublic from './sanitizePublic';

const EC = elliptic.ec;
const ec = new EC('secp256k1');

export default function secp256k1Compress (publicKey: Uint8Array): Uint8Array {
  return new Uint8Array(
    ec.keyFromPublic(
      sanitizePublic(publicKey)
    ).getPublic().encodeCompressed()
  );
}
