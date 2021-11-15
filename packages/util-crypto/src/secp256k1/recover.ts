// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { recoverPublicKey, Signature } from '@noble/secp256k1';

import { assertReturn } from '@polkadot/util';

/**
 * @name secp256k1Recover
 * @description Recovers a publicKey from the supplied signature
 */
export function secp256k1Recover (message: Uint8Array, signature: Uint8Array, recovery: number): Uint8Array {
  return assertReturn(
    recoverPublicKey(
      message,
      Signature.fromCompact(signature.subarray(0, 64)).toRawBytes(),
      recovery
    ),
    'Unable to recover publicKey from signature'
  );
}
