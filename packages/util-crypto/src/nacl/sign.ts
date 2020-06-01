// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Keypair } from '../types';

import nacl from 'tweetnacl';
import { assert, u8aToU8a } from '@polkadot/util';
import { isReady, ed25519Sign } from '@polkadot/wasm-crypto';

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
export default function naclSign (message: Uint8Array | string, { publicKey, secretKey }: Partial<Keypair>): Uint8Array {
  assert(secretKey, 'Expected a valid secretKey');

  const messageU8a = u8aToU8a(message);

  return isReady()
    ? ed25519Sign(publicKey as Uint8Array, secretKey.subarray(0, 32), messageU8a)
    : nacl.sign.detached(messageU8a, secretKey);
}
