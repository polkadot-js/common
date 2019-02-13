// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeypairType } from '../types';

import nacl from 'tweetnacl';
import { assert } from '@polkadot/util/index';

/**
 * @name naclSign
 * @signature naclSign (message: Uint8Array, secretKey: Uint8Array): Uint8Array
 * @summary Signs a message using the supplied secretKey
 * @description
 * Returns message signature of `message`, using the `secretKey`.
 * @example
 * <BR>
 *
 * ```javascript
 * import { naclSign } from '@polkadot/util-crypto';
 *
 * naclSign([...], [...]); // => [...]
 * ```
 */
export default function naclSign (message: Uint8Array, { secretKey }: Partial<KeypairType>): Uint8Array {
  assert(secretKey && secretKey.length === 64, 'Expected valid secretKey, 64 bytes');

  return nacl.sign.detached(message, secretKey as Uint8Array);
}
