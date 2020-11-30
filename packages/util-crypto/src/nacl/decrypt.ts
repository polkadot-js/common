// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import * as nacl from 'tweetnacl';

/**
 * @name naclDecrypt
 * @summary Decrypts a message using the supplied secretKey and nonce
 * @description
 * Returns an decrypted message, using the `secret` and `nonce`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclDecrypt } from '@polkadot/util-crypto';
 *
 * naclDecrypt([...], [...], [...]); // => [...]
 * ```
 */
export function naclDecrypt (encrypted: Uint8Array, nonce: Uint8Array, secret: Uint8Array): Uint8Array | null {
  return nacl.secretbox.open(encrypted, nonce, secret) || null;
}
