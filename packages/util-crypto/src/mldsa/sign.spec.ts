// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a } from '@polkadot/util';

import { mldsaPairFromSeed } from './pair/fromSeed.js';
import { mldsaSign } from './sign.js';
import { mldsaVerify } from './verify.js';

const MESSAGE = 'this is a message';
const SEED = new Uint8Array(32);

SEED.set([
  0x9d, 0x61, 0x9d, 0xef, 0xfd, 0x5a, 0x60, 0xba,
  0x84, 0x4a, 0xf4, 0x92, 0xec, 0x2c, 0xc4, 0x44,
  0x49, 0xc5, 0x69, 0x7b, 0x32, 0x69, 0x19, 0x70,
  0x3b, 0xac, 0x03, 0x1c, 0xae, 0x7f, 0x60, 0x9d
]);

describe('mldsaSign', (): void => {
  it('signs a message correctly', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const signature = mldsaSign(MESSAGE, keypair);

    expect(signature).toBeInstanceOf(Uint8Array);
    expect(signature.length).toBe(4627);
    expect(
      mldsaVerify(MESSAGE, signature, keypair.publicKey)
    ).toBe(true);
  });

  it('signs string messages', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const signature = mldsaSign(MESSAGE, keypair);

    expect(signature).toBeInstanceOf(Uint8Array);
    expect(
      mldsaVerify(MESSAGE, signature, keypair.publicKey)
    ).toBe(true);
  });

  it('signs Uint8Array messages', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const messageU8a = stringToU8a(MESSAGE);
    const signature = mldsaSign(messageU8a, keypair);

    expect(signature).toBeInstanceOf(Uint8Array);
    expect(
      mldsaVerify(messageU8a, signature, keypair.publicKey)
    ).toBe(true);
  });

  it('produces different signatures for different messages', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const signature1 = mldsaSign('message1', keypair);
    const signature2 = mldsaSign('message2', keypair);

    expect(signature1).not.toEqual(signature2);
  });

  it('produces different signatures for different keys', (): void => {
    const keypair1 = mldsaPairFromSeed(SEED);
    const keypair2 = mldsaPairFromSeed(new Uint8Array(32).fill(1));

    const signature1 = mldsaSign(MESSAGE, keypair1);
    const signature2 = mldsaSign(MESSAGE, keypair2);

    expect(signature1).not.toEqual(signature2);
  });

  it('throws when secretKey is not provided', (): void => {
    const keypair = mldsaPairFromSeed(SEED);

    expect(() =>
      mldsaSign(MESSAGE, { publicKey: keypair.publicKey })
    ).toThrow('Expected a valid secretKey');
  });

  it('throws when publicKey is not provided', (): void => {
    const keypair = mldsaPairFromSeed(SEED);

    expect(() =>
      mldsaSign(MESSAGE, { secretKey: keypair.secretKey })
    ).toThrow('Expected a valid publicKey');
  });

  it('throws when neither keys are provided', (): void => {
    expect(() =>
      mldsaSign(MESSAGE, {})
    ).toThrow('Expected a valid secretKey');
  });

  it('handles empty messages', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const signature = mldsaSign('', keypair);

    expect(signature).toBeInstanceOf(Uint8Array);
    expect(
      mldsaVerify('', signature, keypair.publicKey)
    ).toBe(true);
  });

  it('handles empty Uint8Array messages', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const emptyMessage = new Uint8Array(0);
    const signature = mldsaSign(emptyMessage, keypair);

    expect(signature).toBeInstanceOf(Uint8Array);
    expect(
      mldsaVerify(emptyMessage, signature, keypair.publicKey)
    ).toBe(true);
  });

  it('handles large messages', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const largeMessage = 'a'.repeat(10000);
    const signature = mldsaSign(largeMessage, keypair);

    expect(signature).toBeInstanceOf(Uint8Array);
    expect(
      mldsaVerify(largeMessage, signature, keypair.publicKey)
    ).toBe(true);
  });

  it('is compatible with verify function', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const messages = [
      'hello world',
      'test message',
      stringToU8a('binary message'),
      new Uint8Array([1, 2, 3, 4, 5])
    ];

    for (const message of messages) {
      const signature = mldsaSign(message, keypair);
      expect(
        mldsaVerify(message, signature, keypair.publicKey)
      ).toBe(true);
    }
  });
});
