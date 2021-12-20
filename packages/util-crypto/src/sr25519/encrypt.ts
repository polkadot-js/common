// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';

import { u8aConcat, u8aToU8a } from '@polkadot/util';

import { mnemonicGenerate, mnemonicToMiniSecret } from '../mnemonic';
import { naclEncrypt } from '../nacl';
import { pbkdf2Encode } from '../pbkdf2';
import { sr25519PairFromSeed } from './pair/fromSeed';
import { sr25519Agreement } from './agreement';

/**
 * @name sr25519Encrypt
 * @description Returns encrypted message of `message`, using the supplied pair
 */
export function sr25519Encrypt (message: HexString | Uint8Array | string, publicKey: Uint8Array): Uint8Array {
  const { encryptedMessagePairPublicKey, encryptionKey } = generateNewEncryptionKey(publicKey);
  const { encrypted, nonce } = naclEncrypt(u8aToU8a(message), encryptionKey);

  return u8aConcat(nonce, encryptedMessagePairPublicKey, encrypted);
}

function generateNewEncryptionKey (receiverPublicKey: Uint8Array) {
  const encryptedMessagePair = sr25519PairFromSeed(mnemonicToMiniSecret(mnemonicGenerate()));

  return {
    encryptedMessagePairPublicKey: encryptedMessagePair.publicKey,
    encryptionKey: buildSR25519EncryptionKey(receiverPublicKey, encryptedMessagePair.secretKey, encryptedMessagePair.publicKey)
  };
}

export function buildSR25519EncryptionKey (publicKey: Uint8Array, secretKey: Uint8Array, encryptedMessagePairPublicKey: Uint8Array) {
  const agreementKey = sr25519Agreement(secretKey, publicKey);
  const masterSecret = u8aConcat(encryptedMessagePairPublicKey, agreementKey);

  return deriveKey(masterSecret);
}

function deriveKey (masterSecret: Uint8Array) {
  const keySize = 32;
  const { password } = pbkdf2Encode(masterSecret, masterSecret.slice(0, 32));

  return password.slice(0, keySize);
}
