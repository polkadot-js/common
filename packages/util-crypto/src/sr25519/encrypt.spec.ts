// Copyright 2017-2026 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import type { Keypair } from '../types.js';

import * as sr25519 from '@scure/sr25519';

import { u8aToHex } from '@polkadot/util';

import { sr25519Decrypt, sr25519Encrypt, sr25519PairFromSeed } from './index.js';

const { Merlin } = sr25519.__tests;

describe('sr25519Encrypt / sr25519Decrypt', (): void => {
  let alice: Keypair;
  let bob: Keypair;

  beforeEach((): void => {
    alice = sr25519PairFromSeed('0x98b3d305d5a5eace562387e47e59badd4d77e3f72cabfb10a60f8a197059f0a8');
    bob = sr25519PairFromSeed('0x9732eea001851ff862d949a1699c9971f3a26edbede2ad7922cbbe9a0701f366');
  });

  it('round-trips a message', (): void => {
    const message = new TextEncoder().encode('hello bob, this is alice');
    const ctx = new TextEncoder().encode('test-round-trip');

    const encrypted = sr25519Encrypt(message, bob.publicKey, ctx);
    const decrypted = sr25519Decrypt(encrypted, bob, ctx);

    expect(decrypted).toEqual(message);
  });

  it('fails to decrypt with wrong key', (): void => {
    const message = new TextEncoder().encode('secret message');
    const ctx = new TextEncoder().encode('test-wrong-key');

    const encrypted = sr25519Encrypt(message, bob.publicKey, ctx);

    expect(
      () => sr25519Decrypt(encrypted, alice, ctx)
    ).toThrow();
  });

  it('fails to decrypt with wrong context', (): void => {
    const message = new TextEncoder().encode('context sensitive');
    const encrypted = sr25519Encrypt(message, bob.publicKey, 'ctx-a');

    expect(
      () => sr25519Decrypt(encrypted, bob, 'ctx-b')
    ).toThrow();
  });

  it('handles empty plaintext', (): void => {
    const ctx = new TextEncoder().encode('test-empty');

    const encrypted = sr25519Encrypt(new Uint8Array(), bob.publicKey, ctx);

    // Overhead: 1 (version) + 32 (ephemeral pk) + 12 (nonce) + 16 (tag) = 61
    expect(encrypted.length).toEqual(61);

    const decrypted = sr25519Decrypt(encrypted, bob, ctx);

    expect(decrypted.length).toEqual(0);
  });

  it('rejects truncated ciphertext', (): void => {
    expect(
      () => sr25519Decrypt(new Uint8Array(10), bob, 'ctx')
    ).toThrow('ECIES ciphertext too short');
  });

  it('rejects bad version', (): void => {
    const encrypted = sr25519Encrypt(new TextEncoder().encode('test'), bob.publicKey, 'ctx');

    encrypted[0] = 0xFF;

    expect(
      () => sr25519Decrypt(encrypted, bob, 'ctx')
    ).toThrow('Unsupported ECIES version: 0xff');
  });

  it('rejects tampered ciphertext', (): void => {
    const encrypted = sr25519Encrypt(new TextEncoder().encode('do not tamper'), bob.publicKey, 'ctx');

    encrypted[encrypted.length - 1] ^= 0x01;

    expect(
      () => sr25519Decrypt(encrypted, bob, 'ctx')
    ).toThrow();
  });

  it('encrypts different ciphertexts for same plaintext (random ephemeral)', (): void => {
    const message = new TextEncoder().encode('same message');
    const ctx = new TextEncoder().encode('test-nondeterministic');

    const enc1 = sr25519Encrypt(message, bob.publicKey, ctx);
    const enc2 = sr25519Encrypt(message, bob.publicKey, ctx);

    // Different ephemeral keys means entirely different ciphertexts
    expect(enc1).not.toEqual(enc2);

    // Both decrypt correctly
    expect(sr25519Decrypt(enc1, bob, ctx)).toEqual(message);
    expect(sr25519Decrypt(enc2, bob, ctx)).toEqual(message);
  });

  it('handles large plaintext', (): void => {
    const message = new Uint8Array(65536).fill(0xAB);
    const ctx = new TextEncoder().encode('large');

    const encrypted = sr25519Encrypt(message, bob.publicKey, ctx);
    const decrypted = sr25519Decrypt(encrypted, bob, ctx);

    expect(decrypted).toEqual(message);
  });

  it('accepts string inputs for message and context', (): void => {
    const encrypted = sr25519Encrypt('hello string api', bob.publicKey, 'string-ctx');
    const decrypted = sr25519Decrypt(encrypted, bob, 'string-ctx');

    expect(new TextDecoder().decode(decrypted)).toEqual('hello string api');
  });

  it('KDF matches schnorrkel Rust implementation (cross-compat vector)', (): void => {
    // Known inputs — verified against schnorrkel ecies::cross_compat_tests::print_kdf_test_vector
    const sharedSecret = new Uint8Array(32).fill(0x42);
    const ephPk = new Uint8Array(32).fill(0x01);
    const recipPk = new Uint8Array(32).fill(0x02);
    const ctx = new TextEncoder().encode('test-ctx');

    const t = new Merlin('sr25519-ecies');

    t.appendMessage('ctx', ctx);
    t.appendMessage('ephemeral-pk', ephPk);
    t.appendMessage('recipient-pk', recipPk);
    t.appendMessage('shared-secret', sharedSecret);

    const key = t.challengeBytes('aead-key', 32);

    expect(
      u8aToHex(key)
    ).toEqual('0x3544505dede6f8c4bc66c666067560e4600966fdba7d56127cb644c8d1c26b70');
  });
});
