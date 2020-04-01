// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import nacl from 'tweetnacl';

import randomAsU8a from '../random/asU8a';

interface Sealed {
  sealed: Uint8Array;
  nonce: Uint8Array;
}

/**
 * @name naclSeal
 * @summary Seals a message using the sender's encrypting secretKey, receiver's public key, and nonce
 * @description
 * Returns an encrypted message which can be open only by receiver's secretKey. If the `nonce` was not supplied, a random value is generated.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclEncrypt } from '@polkadot/util-crypto';
 *
 * naclSeal([...], [...], [...], [...]); // => [...]
 * ```
 */
export default function naclSeal (message: Uint8Array, senderBoxSecret: Uint8Array, receiverBoxPublic: Uint8Array, nonce: Uint8Array = randomAsU8a(24)): Sealed {
  return {
    nonce,
    sealed: nacl.box(message, nonce, receiverBoxPublic, senderBoxSecret)
  };
}
