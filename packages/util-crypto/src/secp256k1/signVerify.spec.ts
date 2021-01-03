// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a } from '@polkadot/util';

import { randomAsU8a } from '../random/asU8a';
import { secp256k1Hasher } from './hasher';
import { secp256k1Expand, secp256k1KeypairFromSeed, secp256k1Sign, secp256k1Verify } from '.';

const MESSAGE = stringToU8a('this is a message');

describe('sign and verify', (): void => {
  it('verify message signature', (): void => {
    const address = '0x59f587c045d4d4e9aa1016eae43770fc0551df8a385027723342753a876aeef0';
    const sig = '0x92fcacf0946bbd10b31dfe16d567ed1d3014e81007dd9e5256e19c0f07eacc1643b151ca29e449a765e16a7ce59b88d800467d6b3412d30ea8ad22307a59664b00';
    const msg = stringToU8a('secp256k1');

    expect(secp256k1Verify(msg, sig, address)).toBe(true);
  });

  it('has 65-byte signatures', (): void => {
    const pair = secp256k1KeypairFromSeed(randomAsU8a());

    expect(secp256k1Sign(MESSAGE, pair)).toHaveLength(65);
  });

  it('signs/verifies a message by random key (blake2)', (): void => {
    const pair = secp256k1KeypairFromSeed(randomAsU8a());
    const signature = secp256k1Sign(MESSAGE, pair);
    const address = secp256k1Hasher('blake2', pair.publicKey);

    expect(secp256k1Verify(MESSAGE, signature, address)).toBe(true);
  });

  it('signs/verifies a message by random key (keccak)', (): void => {
    const pair = secp256k1KeypairFromSeed(randomAsU8a());
    const signature = secp256k1Sign(MESSAGE, pair, 'keccak');
    const address = secp256k1Hasher('keccak', secp256k1Expand(pair.publicKey));

    expect(secp256k1Verify(MESSAGE, signature, address, 'keccak')).toBe(true);
  });

  it('fails verification on hasher mismatches', (): void => {
    const pair = secp256k1KeypairFromSeed(randomAsU8a());
    const signature = secp256k1Sign(MESSAGE, pair, 'keccak');
    const address = secp256k1Hasher('keccak', secp256k1Expand(pair.publicKey));

    expect(secp256k1Verify(MESSAGE, signature, address, 'blake2')).toBe(false);
  });

  it('works over a range of random keys (blake2)', (): void => {
    for (let i = 0; i < 256; i++) {
      const pair = secp256k1KeypairFromSeed(randomAsU8a());

      try {
        expect(
          secp256k1Verify(
            MESSAGE,
            secp256k1Sign(MESSAGE, pair, 'blake2'),
            secp256k1Hasher('blake2', pair.publicKey),
            'blake2'
          )
        ).toBe(true);
      } catch (error) {
        console.error(`blake2 failed on #${i}`);
        throw error;
      }
    }
  }, 120000);

  it('works over a range of random keys (keccak)', (): void => {
    for (let i = 0; i < 256; i++) {
      const pair = secp256k1KeypairFromSeed(randomAsU8a());

      try {
        expect(
          secp256k1Verify(
            MESSAGE,
            secp256k1Sign(MESSAGE, pair, 'keccak'),
            secp256k1Hasher('keccak', secp256k1Expand(pair.publicKey)),
            'keccak'
          )
        ).toBe(true);
      } catch (error) {
        console.error(`keccak failed on #${i}`);
        throw error;
      }
    }
  }, 120000);
});
