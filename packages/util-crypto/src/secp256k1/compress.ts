// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ec as EC } from 'elliptic';
import { assert } from '@polkadot/util';

const ec = new EC('secp256k1');

export default function secp256k1Compress (publicKey: Uint8Array): Uint8Array {
  assert([33, 65].includes(publicKey.length), 'Invalid publicKey provided');

  return new Uint8Array(
    ec.keyFromPublic(publicKey).getPublic().encodeCompressed()
  );
}
