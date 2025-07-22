// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a } from '@polkadot/util';

import { mldsaPairFromSeed } from './pair/fromSeed.js';
import { mldsaSign } from './sign.js';
import { mldsaVerify } from './verify.js';

const MESSAGE = 'this is a message';
const SEED = new Uint8Array(32);

SEED.set([
  0x9d, 0x61, 0xb1, 0x9d, 0xef, 0xfd, 0x5a, 0x60,
  0xba, 0x84, 0x4a, 0xf4, 0x92, 0xec, 0x2c, 0xc4,
  0x44, 0x49, 0xc5, 0x69, 0x7b, 0x32, 0x69, 0x19,
  0x70, 0x3b, 0xac, 0x03, 0x1c, 0xae, 0x7f, 0x60
]);

describe('mldsaVerify', (): void => {
  it('returns true on valid signature', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const signature = mldsaSign(MESSAGE, keypair);

    expect(
      mldsaVerify(MESSAGE, signature, keypair.publicKey)
    ).toBe(true);
  });

  it('returns false on invalid signature', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const signature = mldsaSign(MESSAGE, keypair);

    // Tamper with signature
    signature[0] = (signature[0] + 1) % 256;

    expect(
      mldsaVerify(MESSAGE, signature, keypair.publicKey)
    ).toBe(false);
  });

  it('returns false with wrong public key', (): void => {
    const keypair1 = mldsaPairFromSeed(SEED);
    const keypair2 = mldsaPairFromSeed(new Uint8Array(32).fill(1));
    const signature = mldsaSign(MESSAGE, keypair1);

    expect(
      mldsaVerify(MESSAGE, signature, keypair2.publicKey)
    ).toBe(false);
  });

  it('verifies with string message', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const signature = mldsaSign(MESSAGE, keypair);

    expect(
      mldsaVerify(MESSAGE, signature, keypair.publicKey)
    ).toBe(true);
  });

  it('verifies with Uint8Array message', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const messageU8a = stringToU8a(MESSAGE);
    const signature = mldsaSign(messageU8a, keypair);

    expect(
      mldsaVerify(messageU8a, signature, keypair.publicKey)
    ).toBe(true);
  });

  it('throws on invalid public key length', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const signature = mldsaSign(MESSAGE, keypair);
    const invalidPubkey = new Uint8Array(32); // Too short

    expect(() =>
      mldsaVerify(MESSAGE, signature, invalidPubkey)
    ).toThrow('Invalid publicKey, received 32, expected 2592');
  });

  it('throws on invalid signature length', (): void => {
    const keypair = mldsaPairFromSeed(SEED);
    const invalidSig = new Uint8Array(32); // Too short

    expect(() =>
      mldsaVerify(MESSAGE, invalidSig, keypair.publicKey)
    ).toThrow('Invalid signature, received 32 bytes, expected 4627');
  });
});
