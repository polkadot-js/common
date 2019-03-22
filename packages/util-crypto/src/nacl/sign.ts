// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Keypair } from '../types';

import nacl from 'tweetnacl';
import { assert } from '@polkadot/util';
import { isReady, sign } from '@polkadot/wasm-dalek-ed25519';

/**
 * @name naclSign
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
export default function naclSign (message: Uint8Array, { publicKey, secretKey }: Partial<Keypair>): Uint8Array {
  assert(secretKey, 'Expected valid secretKey');

  return isReady()
    ? sign(publicKey as Uint8Array, (secretKey as Uint8Array).subarray(0, 32), message)
    : nacl.sign.detached(message, secretKey as Uint8Array);
}
