// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import secp256k1 from 'secp256k1';
import { bufferToU8a, u8aToBuffer } from '@polkadot/util/index';

/**
 * @name secp256k1Recover
 * @description Recovers a publicKey from the supplied signature
 */
export default function secp256k1Recover (_message: Uint8Array, _signature: Uint8Array, recovery: number): Uint8Array {
  const message = u8aToBuffer(_message);
  const signature = u8aToBuffer(_signature);

  return bufferToU8a(
    secp256k1.recover(message, signature, recovery)
  );
}
