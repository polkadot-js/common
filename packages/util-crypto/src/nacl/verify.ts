// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
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
export default function naclVerify (message: Uint8Array | string, signature: Uint8Array | string, publicKey: Uint8Array | string): boolean {
  const messageU8a = u8aToU8a(message);
  const signatureU8a = u8aToU8a(signature);
  const publicKeyU8a = u8aToU8a(publicKey);

  return isReady()
    ? ed25519Verify(signatureU8a, messageU8a, publicKeyU8a)
    : nacl.sign.detached.verify(messageU8a, signatureU8a, publicKeyU8a);
}
