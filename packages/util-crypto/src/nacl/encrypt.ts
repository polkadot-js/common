// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import nacl from 'tweetnacl';

import randomAsU8a from '../random/asU8a';

type Encrypted = {
  encrypted: Uint8Array,
  nonce: Uint8Array
};

/**
 * @name naclEncrypt
 * @signature naclEncrypt (message: Uint8Array, secret: Uint8Array, nonce?: Uint8Array): { encrypted: Uint8Array, nonce: Uint8Array }
 * @summary Encrypts a message using the supplied secretKey and nonce
 * @description
 * Returns an encrypted message, using the `secretKey` and `nonce`. If the `nonce` was not supplied, a random value is generated.
 * @example
 *   import { naclEncrypt } from '@polkadot/util-crypto';
 *
 *   naclSign([...], [...]) // => [...]
 */
export default function naclEncrypt (message: Uint8Array, secret: Uint8Array, nonce: Uint8Array = randomAsU8a(24)): Encrypted {
  return {
    encrypted: nacl.secretbox(message, nonce, secret),
    nonce
  };
}
