// Copyright 2017-2025 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { stringToU8a } from '@polkadot/util';
import { cryptoWaitReady, randomAsU8a } from '@polkadot/util-crypto';

import Keyring from './index.js';

await cryptoWaitReady();

describe('MLDSA keyring', (): void => {
  const MESSAGE = 'this is a test message for mldsa';
  let keyring: Keyring;

  beforeEach((): void => {
    keyring = new Keyring({ type: 'mldsa' });
  });

  it('creates MLDSA keypair from seed', (): void => {
    const seed = randomAsU8a(32);
    const pair = keyring.addFromSeed(seed);

    expect(pair.type).toBe('mldsa');
    expect(pair.publicKey).toBeInstanceOf(Uint8Array);
    expect(pair.publicKey.length).toBe(2592);
  });

  it('signs and verifies messages', (): void => {
    const seed = randomAsU8a(32);
    const pair = keyring.addFromSeed(seed);
    const signature = pair.sign(MESSAGE);

    expect(signature).toBeInstanceOf(Uint8Array);

    const isValid = pair.verify(MESSAGE, signature, pair.publicKey);
    expect(isValid).toBe(true);
  });

  it('signs Uint8Array messages', (): void => {
    const seed = randomAsU8a(32);
    const pair = keyring.addFromSeed(seed);
    const messageU8a = stringToU8a(MESSAGE);
    const signature = pair.sign(messageU8a);
    const isValid = pair.verify(messageU8a, signature, pair.publicKey);

    expect(isValid).toBe(true);
  });

  it('fails verification with wrong signature', (): void => {
    const seed = randomAsU8a(32);
    const pair = keyring.addFromSeed(seed);
    const signature = pair.sign(MESSAGE);

    // Tamper with signature
    signature[0] = (signature[0] + 1) % 256;

    const isValid = pair.verify(MESSAGE, signature, pair.publicKey);
    expect(isValid).toBe(false);
  });

  it('creates different keypairs for different seeds', (): void => {
    const seed1 = new Uint8Array(32).fill(1);
    const seed2 = new Uint8Array(32).fill(2);

    const pair1 = keyring.addFromSeed(seed1);
    const pair2 = keyring.addFromSeed(seed2);

    expect(pair1.publicKey).not.toEqual(pair2.publicKey);
    expect(pair1.address).not.toBe(pair2.address);
  });

  it('generates consistent addresses from same seed', (): void => {
    const seed = randomAsU8a(32);
    const pair1 = keyring.addFromSeed(seed);

    const keyring2 = new Keyring({ type: 'mldsa' });
    const pair2 = keyring2.addFromSeed(seed);

    expect(pair1.address).toBe(pair2.address);
    expect(pair1.publicKey).toEqual(pair2.publicKey);
  });
});
