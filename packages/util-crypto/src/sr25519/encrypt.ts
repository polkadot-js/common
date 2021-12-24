// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// SR25519 Encryption/Decryption following Elliptic Curve Integrated Encryption Scheme (ECIES)
// https://cryptobook.nakov.com/asymmetric-key-ciphers/ecies-public-key-encryption
// Implementation details:
// The algorithms used were chosen among those already used in this library
// - 1 - Ephemeral Key generation
//       Generate new keypair using the wasm sr25519KeypairFromSeed function, with a random seed from
//       mnemonicGenerate
// - 2 - Key Agreement
//       Use wasm sr25519Agree function between the generated ephemeral private key and the recipient public key
// - 3 - Key Derivation
//       Use pbkdf2 (random salt is generated, default 2048 rounds) to derive a new secret from the previous step output
//       The derived secret is split into :
//       - MAC key (first 32 bytes)
//       - encryption key (last 32 bytes)
// - 4 - Encryption
//       Use nacl.secretbox api symmetric encryption (xsalsa20-poly1305) to encrypt the message
//       with the encryption key generated at step 3.
//       A nonce (24 bytes) is randomly generated.
// - 5 - MAC Generation
//       HMAC SHA256 (using the MAC key from step 3) of the concatenation of the encryption nonce, ephemeral public key and encrypted message
//
// The encrypted message is the concatenation of the following elements :
// - nonce (24 bytes) : random generated nonce used for the symmetric encryption (step 4)
// - keyDerivationSalt (32 bytes) : random generated salt used for the key derivation (step 3)
// - public key (32 bytes): public key of the ephemeral generated keypair (step 1)
// - macValue (32 bytes): mac value computed at step 5
// - encrypted (remaining bytes): encrypted message (step 4)

import type { HexString } from '@polkadot/util/types';

import { assert, u8aConcat, u8aToU8a } from '@polkadot/util';

import { hmacSha256AsU8a } from '../hmac';
import { mnemonicGenerate, mnemonicToMiniSecret } from '../mnemonic';
import { naclEncrypt } from '../nacl';
import { pbkdf2Encode } from '../pbkdf2';
import { randomAsU8a } from '../random';
import { Keypair } from '../types';
import { sr25519PairFromSeed } from './pair/fromSeed';
import { sr25519Agreement } from './agreement';

const encryptionKeySize = 32;
const macKeySize = 32;
const derivationKeyRounds = 2048;

export const keyDerivationSaltSize = 32;
export const nonceSize = 24;

/**
 * @name sr25519Encrypt
 * @description Returns encrypted message of `message`, using the supplied pair
 */
export function sr25519Encrypt (message: HexString | Uint8Array | string, receiverPublicKey: Uint8Array, senderKeyPair?: Keypair): Uint8Array {
  const messageKeyPair = senderKeyPair || generateEphemeralKeypair();
  const { encryptionKey, keyDerivationSalt, macKey } = generateEncryptionKey(messageKeyPair, receiverPublicKey);
  const { encrypted, nonce } = naclEncrypt(u8aToU8a(message), encryptionKey, randomAsU8a(nonceSize));
  const macValue = macData(nonce, encrypted, messageKeyPair.publicKey, macKey);

  return u8aConcat(nonce, keyDerivationSalt, messageKeyPair.publicKey, macValue, encrypted);
}

function generateEphemeralKeypair (): Keypair {
  return sr25519PairFromSeed(mnemonicToMiniSecret(mnemonicGenerate()));
}

function generateEncryptionKey (senderKeyPair: Keypair, receiverPublicKey: Uint8Array) {
  const { encryptionKey, keyDerivationSalt, macKey } = buildSR25519EncryptionKey(receiverPublicKey, senderKeyPair.secretKey, senderKeyPair.publicKey);

  return {
    encryptionKey,
    keyDerivationSalt,
    macKey
  };
}

export function buildSR25519EncryptionKey (publicKey: Uint8Array, secretKey: Uint8Array, encryptedMessagePairPublicKey: Uint8Array, salt: Uint8Array = randomAsU8a(keyDerivationSaltSize)) {
  const agreementKey = sr25519Agreement(secretKey, publicKey);
  const masterSecret = u8aConcat(encryptedMessagePairPublicKey, agreementKey);

  return deriveKey(masterSecret, salt);
}

function deriveKey (masterSecret: Uint8Array, salt: Uint8Array) {
  const { password } = pbkdf2Encode(masterSecret, salt, derivationKeyRounds);

  assert(password.byteLength >= macKeySize + encryptionKeySize, 'Wrong derived key length');

  return {
    encryptionKey: password.slice(macKeySize, macKeySize + encryptionKeySize),
    keyDerivationSalt: salt,
    macKey: password.slice(0, macKeySize)
  };
}

export function macData (nonce: Uint8Array, encryptedMessage: Uint8Array, encryptedMessagePairPublicKey: Uint8Array, macKey: Uint8Array): Uint8Array {
  return hmacSha256AsU8a(macKey, u8aConcat(nonce, encryptedMessagePairPublicKey, encryptedMessage));
}
