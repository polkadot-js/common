// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { Keypair, KeypairType } from '../types';

import { assert, u8aToU8a } from '@polkadot/util';

import { ed25519Encrypt } from '../ed25519';
import { sr25519Encrypt } from '../sr25519';

/**
 * @name encrypt
 * @summary Encrypt a message using the given publickey
 * @description Returns the encrypted message of the given message using the public key.
 * The encrypted message can be decrypted by the corresponding keypair using keypair.decrypt() method
 */
export function encrypt (message: HexString | string | Uint8Array, recipientPublicKey: HexString | string | Uint8Array, recipientKeyType: KeypairType, senderKeyPair?: Keypair): Uint8Array {
  assert(!['ecdsa', 'ethereum'].includes(recipientKeyType), 'Secp256k1 not supported yet');
  const publicKey = u8aToU8a(recipientPublicKey);

  return recipientKeyType === 'ed25519'
    ? ed25519Encrypt(message, publicKey, senderKeyPair)
    : sr25519Encrypt(message, publicKey, senderKeyPair);
}
