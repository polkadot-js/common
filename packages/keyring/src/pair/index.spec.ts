// Copyright 2017-2020 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { cryptoWaitReady, encodeAddress as toSS58, setSS58Format } from '@polkadot/util-crypto';

import { PAIRS } from '../testing';
import testingPairs from '../testingPairs';
import createPair from '.';

const keyring = testingPairs({ type: 'ed25519' }, false);

describe('pair', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  const SIGNATURE = new Uint8Array([80, 191, 198, 147, 225, 207, 75, 88, 126, 39, 129, 109, 191, 38, 72, 181, 75, 254, 81, 143, 244, 79, 237, 38, 236, 141, 28, 252, 134, 26, 169, 234, 79, 33, 153, 158, 151, 34, 175, 188, 235, 20, 35, 135, 83, 120, 139, 211, 233, 130, 1, 208, 201, 215, 73, 80, 56, 98, 185, 196, 11, 8, 193, 14]);

  it('has a publicKey', (): void => {
    expect(
      keyring.alice.publicKey
    ).toEqual(
      new Uint8Array([209, 114, 167, 76, 218, 76, 134, 89, 18, 195, 43, 160, 168, 10, 87, 174, 105, 171, 174, 65, 14, 92, 203, 89, 222, 232, 78, 47, 68, 50, 219, 79])
    );
  });

  it('allows signing', (): void => {
    expect(
      keyring.alice.sign(
        new Uint8Array([0x61, 0x62, 0x63, 0x64])
      )
    ).toEqual(SIGNATURE);
  });

  it('validates a correctly signed message', (): void => {
    expect(
      keyring.alice.verify(
        new Uint8Array([0x61, 0x62, 0x63, 0x64]),
        SIGNATURE
      )
    ).toEqual(true);
  });

  it('fails a correctly signed message (message changed)', (): void => {
    expect(
      keyring.alice.verify(
        new Uint8Array([0x61, 0x62, 0x63, 0x64, 0x65]),
        SIGNATURE
      )
    ).toEqual(false);
  });

  it('allows setting/getting of meta', (): void => {
    keyring.bob.setMeta({ foo: 'bar', something: 'else' });

    expect(keyring.bob.meta).toMatchObject({ foo: 'bar', something: 'else' });

    keyring.bob.setMeta({ something: 'thing' });

    expect(keyring.bob.meta).toMatchObject({ foo: 'bar', something: 'thing' });
  });

  it('allows encoding of address with different prefixes', (): void => {
    expect(keyring.alice.address).toEqual(
      '5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua'
    );

    setSS58Format(68);

    expect(keyring.alice.address).toEqual(
      '7sGUeMak588SPY2YMmmuKUuLz7u2WQpf74F9dCFtSLB2td9d'
    );

    setSS58Format(42);
  });

  it('allows getting public key after decoding', (): void => {
    const PASS = 'testing';
    const encoded = keyring.alice.encodePkcs8(PASS);

    const pair = createPair({ toSS58, type: 'sr25519' }, { publicKey: keyring.alice.publicKey });

    pair.decodePkcs8(PASS, encoded);

    expect(pair.isLocked).toEqual(false);
  });

  it('allows derivation on the pair', (): void => {
    const alice = createPair({ toSS58, type: 'sr25519' }, { publicKey: PAIRS[0].publicKey, secretKey: PAIRS[0].secretKey }, {});
    const stash = alice.derive('//stash');
    const soft = alice.derive('//funding/0');

    expect(stash.publicKey).toEqual(PAIRS[1].publicKey);
    expect(soft.address).toEqual('5ECQNn7UueWHPFda5qUi4fTmTtyCnPvGnuoyVVSj5CboJh9J');
  });

  it('fails to sign when locked', (): void => {
    const pair = createPair({ toSS58, type: 'sr25519' }, { publicKey: keyring.alice.publicKey });

    expect(pair.isLocked).toEqual(true);
    expect((): Uint8Array =>
      pair.sign(new Uint8Array([0]))
    ).toThrow('Cannot sign with a locked key pair');
  });
});
