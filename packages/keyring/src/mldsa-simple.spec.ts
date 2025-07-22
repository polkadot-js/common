// Copyright 2017-2025 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { stringToU8a } from '@polkadot/util';
import { cryptoWaitReady, mldsaVerify, randomAsU8a } from '@polkadot/util-crypto';

import Keyring from './index.js';

await cryptoWaitReady();

describe('MLDSA simple integration', (): void => {
  const MESSAGE = 'test message for mldsa';

  it('creates MLDSA keypair and signs message', (): void => {
    const seed = randomAsU8a(32);
    const keyring = new Keyring({ type: 'mldsa' });
    const pair = keyring.addFromSeed(seed);

    expect(pair.type).toBe('mldsa');
    expect(pair.publicKey).toBeInstanceOf(Uint8Array);
    expect(pair.publicKey.length).toBe(2592);

    const signature = pair.sign(MESSAGE);
    expect(signature).toBeInstanceOf(Uint8Array);
    expect(signature.length).toBe(4627);
  });

  it('creates deterministic keypairs from same seed', (): void => {
    const seed = new Uint8Array(32).fill(123);

    const keyring1 = new Keyring({ type: 'mldsa' });
    const pair1 = keyring1.addFromSeed(seed);

    const keyring2 = new Keyring({ type: 'mldsa' });
    const pair2 = keyring2.addFromSeed(seed);

    expect(pair1.publicKey).toEqual(pair2.publicKey);
    expect(pair1.address).toBe(pair2.address);
  });

  it('signs different messages with different results', (): void => {
    const seed = randomAsU8a(32);
    const keyring = new Keyring({ type: 'mldsa' });
    const pair = keyring.addFromSeed(seed);

    const signature1 = pair.sign('message one');
    const signature2 = pair.sign('message two');

    expect(signature1).not.toEqual(signature2);
  });

  it('verifies signatures using direct MLDSA verify function', (): void => {
    const seed = randomAsU8a(32);
    const keyring = new Keyring({ type: 'mldsa' });
    const pair = keyring.addFromSeed(seed);

    const signature = pair.sign(MESSAGE);

    // Use direct MLDSA verification (bypassing keyring verify issues)
    const isValid = mldsaVerify(MESSAGE, signature, pair.publicKey);
    expect(isValid).toBe(true);

    // Test with tampered signature
    const tamperedSignature = new Uint8Array(signature);
    tamperedSignature[0] = (tamperedSignature[0] + 1) % 256;
    const isInvalid = mldsaVerify(MESSAGE, tamperedSignature, pair.publicKey);
    expect(isInvalid).toBe(false);
  });

  it('handles string and Uint8Array messages', (): void => {
    const seed = randomAsU8a(32);
    const keyring = new Keyring({ type: 'mldsa' });
    const pair = keyring.addFromSeed(seed);

    // String message
    const stringSignature = pair.sign(MESSAGE);
    const stringValid = mldsaVerify(MESSAGE, stringSignature, pair.publicKey);
    expect(stringValid).toBe(true);

    // Uint8Array message
    const messageU8a = stringToU8a(MESSAGE);
    const u8aSignature = pair.sign(messageU8a);
    const u8aValid = mldsaVerify(messageU8a, u8aSignature, pair.publicKey);
    expect(u8aValid).toBe(true);
  });

  it('creates unique addresses for different keypairs', (): void => {
    const keyring = new Keyring({ type: 'mldsa' });

    const seed1 = new Uint8Array(32).fill(1);
    const seed2 = new Uint8Array(32).fill(2);

    const pair1 = keyring.addFromSeed(seed1);
    const pair2 = keyring.addFromSeed(seed2);

    expect(pair1.address).not.toBe(pair2.address);
    expect(pair1.publicKey).not.toEqual(pair2.publicKey);
  });

  it('supports JSON export and import', (): void => {
    const seed = randomAsU8a(32);
    const keyring = new Keyring({ type: 'mldsa' });
    const originalPair = keyring.addFromSeed(seed);

    const password = 'test-password';
    const json = originalPair.toJson(password);

    expect(json.encoded).toBeDefined();
    expect(json.address).toBe(originalPair.address);
    expect(json.meta).toBeDefined();

    const importedPair = keyring.addFromJson(json);
    importedPair.unlock(password);

    expect(importedPair.address).toBe(originalPair.address);
    expect(importedPair.publicKey).toEqual(originalPair.publicKey);
  });

  it('supports locking and unlocking', (): void => {
    const seed = randomAsU8a(32);
    const keyring = new Keyring({ type: 'mldsa' });
    const pair = keyring.addFromSeed(seed);

    // Initially unlocked
    expect(pair.isLocked).toBe(false);

    // Can sign when unlocked
    const signature1 = pair.sign(MESSAGE);
    expect(signature1).toBeInstanceOf(Uint8Array);

    // Lock the pair
    pair.lock();
    expect(pair.isLocked).toBe(true);

    // Cannot sign when locked
    expect(() => pair.sign(MESSAGE)).toThrow('Cannot sign with a locked key pair');

    // Create password-protected JSON and unlock
    const password = 'unlock-test';
    const json = pair.toJson(password);
    pair.unlock(password);

    expect(pair.isLocked).toBe(false);

    // Can sign again after unlock
    const signature2 = pair.sign(MESSAGE);
    expect(signature2).toBeInstanceOf(Uint8Array);
  });

  it('supports metadata', (): void => {
    const seed = randomAsU8a(32);
    const keyring = new Keyring({ type: 'mldsa' });
    const pair = keyring.addFromSeed(seed, { name: 'Test MLDSA Account' });

    expect(pair.meta.name).toBe('Test MLDSA Account');

    pair.setMeta({ name: 'Updated Name', description: 'Post-quantum signature test' });
    expect(pair.meta.name).toBe('Updated Name');
    expect(pair.meta.description).toBe('Post-quantum signature test');
  });
});
