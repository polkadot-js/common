// Copyright 2017-2026 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { chacha20poly1305 } from '@noble/ciphers/chacha';
import * as sr25519 from '@scure/sr25519';

import { u8aToU8a } from '@polkadot/util';

import { randomAsU8a } from '../random/asU8a.js';

const { Merlin } = sr25519.__tests;

const ECIES_VERSION = 0x01;
const NONCE_LEN = 12;
const PUBLIC_KEY_LEN = 32;

/**
 * Derive a ChaCha20-Poly1305 key from ECDH shared secret using a Merlin transcript.
 *
 * This exactly matches schnorrkel's `derive_aead` for wire compatibility with Rust.
 */
function deriveAeadKey (
  sharedSecret: Uint8Array,
  ephemeralPk: Uint8Array,
  recipientPk: Uint8Array,
  ctx: Uint8Array
): Uint8Array {
  const t = new Merlin('sr25519-ecies');

  t.appendMessage('ctx', ctx);
  t.appendMessage('ephemeral-pk', ephemeralPk);
  t.appendMessage('recipient-pk', recipientPk);
  t.appendMessage('shared-secret', sharedSecret);

  return t.challengeBytes('aead-key', 32);
}

/**
 * @name sr25519Encrypt
 * @description Encrypt a message for a recipient using ECIES over sr25519.
 *
 * Uses an ephemeral keypair for forward secrecy, ECDH on Ristretto255
 * for key agreement, Merlin transcript for KDF, and ChaCha20-Poly1305
 * for authenticated encryption. Wire-compatible with schnorrkel's ECIES.
 *
 * Wire format: [version: 1] [ephemeral_pk: 32] [nonce: 12] [ciphertext + tag]
 *
 * @param message The plaintext to encrypt
 * @param recipientPublicKey The recipient's sr25519 public key (32 bytes)
 * @param ctx Application-specific domain separation context
 */
export function sr25519Encrypt (
  message: string | Uint8Array,
  recipientPublicKey: string | Uint8Array,
  ctx: string | Uint8Array
): Uint8Array {
  const messageU8a = u8aToU8a(message);
  const recipientPk = u8aToU8a(recipientPublicKey);
  const ctxU8a = u8aToU8a(ctx);

  if (recipientPk.length !== PUBLIC_KEY_LEN) {
    throw new Error(`Invalid recipientPublicKey, received ${recipientPk.length} bytes, expected 32`);
  }

  // Generate ephemeral keypair
  const ephemeralSeed = randomAsU8a(32);
  const ephemeralSecret = sr25519.secretFromSeed(ephemeralSeed);
  const ephemeralPk = sr25519.getPublicKey(ephemeralSecret);

  // ECDH: ephemeral_secret * recipient_public
  const sharedSecret = sr25519.getSharedSecret(ephemeralSecret, recipientPk);

  // Derive AEAD key via Merlin transcript
  const key = deriveAeadKey(sharedSecret, ephemeralPk, recipientPk, ctxU8a);

  // Generate random nonce
  const nonce = randomAsU8a(NONCE_LEN);

  // Build AAD: version || ephemeral_pk || recipient_pk
  const aad = new Uint8Array(1 + PUBLIC_KEY_LEN + PUBLIC_KEY_LEN);

  aad[0] = ECIES_VERSION;
  aad.set(ephemeralPk, 1);
  aad.set(recipientPk, 1 + PUBLIC_KEY_LEN);

  // Encrypt with ChaCha20-Poly1305
  const cipher = chacha20poly1305(key, nonce, aad);
  const ciphertextAndTag = cipher.encrypt(messageU8a);

  // Assemble: version || ephemeral_pk || nonce || ciphertext_and_tag
  const out = new Uint8Array(1 + PUBLIC_KEY_LEN + NONCE_LEN + ciphertextAndTag.length);

  out[0] = ECIES_VERSION;
  out.set(ephemeralPk, 1);
  out.set(nonce, 1 + PUBLIC_KEY_LEN);
  out.set(ciphertextAndTag, 1 + PUBLIC_KEY_LEN + NONCE_LEN);

  return out;
}
