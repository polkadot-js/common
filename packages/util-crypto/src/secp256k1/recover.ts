// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { secp256k1 } from './secp256k1';

/**
 * @name secp256k1Recover
 * @description Recovers a publicKey from the supplied signature
 */
export function secp256k1Recover (message: Uint8Array, signature: Uint8Array, recovery: number): Uint8Array {
  return new Uint8Array(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    secp256k1
      .recoverPubKey(message, { r: signature.slice(0, 32), s: signature.slice(32, 64) }, recovery)
      .encode(null, true)
  );
}
