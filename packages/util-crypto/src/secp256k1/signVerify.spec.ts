// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stringToU8a } from '@polkadot/util';
import { blake2AsU8a } from '../blake2';
import randomAsU8a from '../random/asU8a';
import pairFromSeed from './keypair/fromSeed';
import sign from './sign';
import verify from './verify';

const MESSAGE = stringToU8a('this is a message');

describe('sign and verify', (): void => {
  it('verify message signature', (): void => {
    const address = '0x59f587c045d4d4e9aa1016eae43770fc0551df8a385027723342753a876aeef0';
    const sig = '0x92fcacf0946bbd10b31dfe16d567ed1d3014e81007dd9e5256e19c0f07eacc1643b151ca29e449a765e16a7ce59b88d800467d6b3412d30ea8ad22307a59664b00';
    const msg = stringToU8a('secp256k1');

    expect(verify(msg, sig, address)).toBe(true);
  });

  it('has 65-byte signatures', (): void => {
    const pair = pairFromSeed(randomAsU8a());

    expect(sign(MESSAGE, pair)).toHaveLength(65);
  });

  it('can sign and verify a message by random key', (): void => {
    const pair = pairFromSeed(randomAsU8a());
    const signature = sign(MESSAGE, pair);
    const address = blake2AsU8a(pair.publicKey, 256);

    expect(verify(MESSAGE, signature, address)).toBe(true);
  });
});
