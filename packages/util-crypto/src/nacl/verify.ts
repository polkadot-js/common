// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import nacl from 'tweetnacl';
import { u8aToU8a } from '@polkadot/util';
import { isReady, ed25519Verify } from '@polkadot/wasm-crypto';

/**
 * @name naclSign
 * @summary Verifies the signature on the supplied message.
 * @description
 * Verifies the `signature` on `message` with the supplied `plublicKey`. Returns `true` on sucess, `false` otherwise.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclVerify } from '@polkadot/util-crypto';
 *
 * naclVerify([...], [...], [...]); // => true/false
 * ```
 */
export default function naclVerify (_message: Uint8Array | string, _signature: Uint8Array | string, _publicKey: Uint8Array | string): boolean {
  const message = u8aToU8a(_message);
  const signature = u8aToU8a(_signature);
  const publicKey = u8aToU8a(_publicKey);

  return isReady()
    ? ed25519Verify(signature, message, publicKey)
    : nacl.sign.detached.verify(message, signature, publicKey);
}
