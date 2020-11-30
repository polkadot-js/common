// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Keypair } from '../types';

import * as nacl from 'tweetnacl';
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
export function naclSign (message: Uint8Array | string, { publicKey, secretKey }: Partial<Keypair>, onlyJs = false): Uint8Array {
  assert(secretKey, 'Expected a valid secretKey');

  const messageU8a = u8aToU8a(message);

  return isReady() && !onlyJs
    ? ed25519Sign(publicKey as Uint8Array, secretKey.subarray(0, 32), messageU8a)
    : nacl.sign.detached(messageU8a, secretKey);
}
