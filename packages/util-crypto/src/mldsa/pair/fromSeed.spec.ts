// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a } from '@polkadot/util';

import { MLDSA_PUBLIC_KEY_LENGTH, MLDSA_SECRET_KEY_LENGTH } from '../constants.js';
import { mldsaPairFromSeed } from './fromSeed.js';
import { mldsaSign } from '../sign.js';
import { mldsaVerify } from '../verify.js';

const SEED = new Uint8Array(32);

SEED.set([
  0x9d, 0x61, 0xb1, 0x9d, 0xef, 0xfd, 0x5a, 0x60,
  0xba, 0x84, 0x4a, 0xf4, 0x92, 0xec, 0x2c, 0xc4,
  0x44, 0x49, 0xc5, 0x69, 0x7b, 0x32, 0x69, 0x19,
  0x70, 0x3b, 0xac, 0x03, 0x1c, 0xae, 0x7f, 0x60
]);

describe('mldsaPairFromSeed', (): void => {
  it('generates a valid keypair from seed', (): void => {
    const keypair = mldsaPairFromSeed(SEED);

    expect(keypair).toBeDefined();
    expect(keypair.publicKey).toBeInstanceOf(Uint8Array);
    expect(keypair.secretKey).toBeInstanceOf(Uint8Array);
    expect(keypair.publicKey.length).toBe(MLDSA_PUBLIC_KEY_LENGTH);
    expect(keypair.secretKey.length).toBe(MLDSA_SECRET_KEY_LENGTH);
  });

  it('generates deterministic keypairs', (): void => {
    const keypair1 = mldsaPairFromSeed(SEED);
    const keypair2 = mldsaPairFromSeed(SEED);

    expect(keypair1.publicKey).toEqual(keypair2.publicKey);
    expect(keypair1.secretKey).toEqual(keypair2.secretKey);
  });

  it('generates different keypairs for different seeds', (): void => {
    const seed2 = new Uint8Array(32).fill(1);
    const keypair1 = mldsaPairFromSeed(SEED);
    const keypair2 = mldsaPairFromSeed(seed2);

    expect(keypair1.publicKey).not.toEqual(keypair2.publicKey);
    expect(keypair1.secretKey).not.toEqual(keypair2.secretKey);
  });

  it('throws on invalid seed length (too short)', (): void => {
    const invalidSeed = new Uint8Array(16); // Too short

    expect(() =>
      mldsaPairFromSeed(invalidSeed)
    ).toThrow('Invalid seed length, expected 32 bytes, received 16');
  });

  it('throws on invalid seed length (too long)', (): void => {
    const invalidSeed = new Uint8Array(64); // Too long

    expect(() =>
      mldsaPairFromSeed(invalidSeed)
    ).toThrow('Invalid seed length, expected 32 bytes, received 64');
  });

  it('throws on empty seed', (): void => {
    const emptySeed = new Uint8Array(0);

    expect(() =>
      mldsaPairFromSeed(emptySeed)
    ).toThrow('Invalid seed length, expected 32 bytes, received 0');
  });

  it('generates keypairs that can sign and verify', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const message = 'test message';
    const signature = mldsaSign(message, keypair);

    expect(
      mldsaVerify(message, signature, keypair.publicKey)
    ).toBe(true);
  });

  it('generates keypairs with consistent sizes', (): void => {
    const keypair1 = mldsaPairFromSeed(SEED);
    const seed2 = new Uint8Array(32).fill(42);
    const keypair2 = mldsaPairFromSeed(seed2);

    // All keypairs should have the same key sizes
    expect(keypair1.publicKey.length).toBe(keypair2.publicKey.length);
    expect(keypair1.secretKey.length).toBe(keypair2.secretKey.length);
  });

  it('handles all-zero seed', (): void => {
    const zeroSeed = new Uint8Array(32); // All zeros
    const keypair = mldsaPairFromSeed(zeroSeed);

    expect(keypair.publicKey).toBeInstanceOf(Uint8Array);
    expect(keypair.secretKey).toBeInstanceOf(Uint8Array);
    expect(keypair.publicKey.length).toBe(MLDSA_PUBLIC_KEY_LENGTH);
    expect(keypair.secretKey.length).toBe(MLDSA_SECRET_KEY_LENGTH);

    // Should still be able to sign/verify
    const message = stringToU8a('test');
    const signature = mldsaSign(message, keypair);
    expect(
      mldsaVerify(message, signature, keypair.publicKey)
    ).toBe(true);
  });

  it('handles all-max seed', (): void => {
    const maxSeed = new Uint8Array(32).fill(255); // All max values
    const keypair = mldsaPairFromSeed(maxSeed);

    expect(keypair.publicKey).toBeInstanceOf(Uint8Array);
    expect(keypair.secretKey).toBeInstanceOf(Uint8Array);
    expect(keypair.publicKey.length).toBe(MLDSA_PUBLIC_KEY_LENGTH);
    expect(keypair.secretKey.length).toBe(MLDSA_SECRET_KEY_LENGTH);

    // Should still be able to sign/verify
    const message = stringToU8a('test');
    const signature = mldsaSign(message, keypair);
    expect(
      mldsaVerify(message, signature, keypair.publicKey)
    ).toBe(true);
  });

  it('generates unique keypairs for sequential seeds', (): void => {
    const seed1 = new Uint8Array(32).fill(0);
    const seed2 = new Uint8Array(32).fill(0);
    seed2[31] = 1; // Only last byte different

    const keypair1 = mldsaPairFromSeed(seed1);
    const keypair2 = mldsaPairFromSeed(seed2);

    expect(keypair1.publicKey).not.toEqual(keypair2.publicKey);
    expect(keypair1.secretKey).not.toEqual(keypair2.secretKey);
  });

  it('maintains seed independence', (): void => {
    const originalSeed = new Uint8Array(SEED);
    const keypair = mldsaPairFromSeed(SEED);

    // Modify the original seed after keypair generation
    SEED.fill(0);

    // The keypair should still work
    const message = 'test message';
    const signature = mldsaSign(message, keypair);
    expect(
      mldsaVerify(message, signature, keypair.publicKey)
    ).toBe(true);

    // Restore the seed for other tests
    SEED.set(originalSeed);
  });
});
