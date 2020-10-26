// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ec as EC } from 'elliptic';

const ec = new EC('secp256k1');

/**
 * @name secp256k1Recover
 * @description Recovers a publicKey from the supplied signature
 */
export default function secp256k1Recover (message: Uint8Array, signature: Uint8Array, recovery: number): Uint8Array {
  return new Uint8Array(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    ec
      .recoverPubKey(message, { r: signature.slice(0, 32), s: signature.slice(32, 64) }, recovery)
      .encode(null, true)
  );
}
