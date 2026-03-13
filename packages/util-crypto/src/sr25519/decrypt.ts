// Copyright 2017-2026 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Keypair } from '../types.js';

import { chacha20poly1305 } from '@noble/ciphers/chacha';
import * as sr25519 from '@scure/sr25519';

import { u8aToU8a } from '@polkadot/util';

const { Merlin } = sr25519.__tests;

const ECIES_VERSION = 0x01;
const NONCE_LEN = 12;
const TAG_LEN = 16;
const PUBLIC_KEY_LEN = 32;
const ECIES_OVERHEAD = 1 + PUBLIC_KEY_LEN + NONCE_LEN + TAG_LEN;

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
 * @name sr25519Decrypt
 * @description Decrypt an ECIES ciphertext using the recipient's sr25519 keypair.
 *
 * The `ctx` must match the context used during encryption.
 * Wire-compatible with schnorrkel's ECIES.
 *
 * @param encrypted The ECIES ciphertext (version + ephemeral_pk + nonce + ciphertext + tag)
 * @param secretKey The recipient's sr25519 secret key (64 bytes) or full keypair
 * @param ctx Application-specific domain separation context (must match encryption)
 */
export function sr25519Decrypt (
  encrypted: string | Uint8Array,
  { publicKey, secretKey }: Partial<Keypair>,
  ctx: string | Uint8Array
): Uint8Array {
  const encryptedU8a = u8aToU8a(encrypted);
  const ctxU8a = u8aToU8a(ctx);

  if (secretKey?.length !== 64) {
    throw new Error(`Invalid secretKey, received ${secretKey?.length ?? 0} bytes, expected 64`);
  }

  if (encryptedU8a.length < ECIES_OVERHEAD) {
    throw new Error('ECIES ciphertext too short');
  }

  // Parse header
  const version = encryptedU8a[0];

  if (version !== ECIES_VERSION) {
    throw new Error(`Unsupported ECIES version: 0x${version.toString(16).padStart(2, '0')}`);
  }

  const ephemeralPk = encryptedU8a.subarray(1, 1 + PUBLIC_KEY_LEN);
  const nonce = encryptedU8a.subarray(1 + PUBLIC_KEY_LEN, 1 + PUBLIC_KEY_LEN + NONCE_LEN);
  const ciphertextAndTag = encryptedU8a.subarray(1 + PUBLIC_KEY_LEN + NONCE_LEN);

  // Derive recipient public key from secret key if not provided
  const recipientPk = publicKey?.length === 32
    ? publicKey
    : sr25519.getPublicKey(secretKey);

  // ECDH: recipient_secret * ephemeral_public
  const sharedSecret = sr25519.getSharedSecret(secretKey, ephemeralPk);

  // Derive AEAD key via Merlin transcript
  const key = deriveAeadKey(sharedSecret, ephemeralPk, recipientPk, ctxU8a);

  // Rebuild AAD: version || ephemeral_pk || recipient_pk
  const aad = new Uint8Array(1 + PUBLIC_KEY_LEN + PUBLIC_KEY_LEN);

  aad[0] = ECIES_VERSION;
  aad.set(ephemeralPk, 1);
  aad.set(recipientPk, 1 + PUBLIC_KEY_LEN);

  // Decrypt with ChaCha20-Poly1305
  const cipher = chacha20poly1305(key, nonce, aad);

  return cipher.decrypt(ciphertextAndTag);
}
