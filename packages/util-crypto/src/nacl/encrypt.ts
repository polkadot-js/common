// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as nacl from 'tweetnacl';

import { randomAsU8a } from '../random/asU8a';

interface Encrypted {
  encrypted: Uint8Array;
  nonce: Uint8Array;
}

/**
 * @name naclEncrypt
 * @summary Encrypts a message using the supplied secretKey and nonce
 * @description
 * Returns an encrypted message, using the `secretKey` and `nonce`. If the `nonce` was not supplied, a random value is generated.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclEncrypt } from '@polkadot/util-crypto';
 *
 * naclEncrypt([...], [...]); // => [...]
 * ```
 */
export function naclEncrypt (message: Uint8Array, secret: Uint8Array, nonce: Uint8Array = randomAsU8a(24)): Encrypted {
  return {
    encrypted: nacl.secretbox(message, nonce, secret),
    nonce
  };
}
