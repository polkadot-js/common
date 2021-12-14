// Copyright 2017-2021 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a, stringToU8a, u8aToHex, u8aToString } from '@polkadot/util';
import { cryptoWaitReady, encodeAddress as toSS58, mnemonicGenerate, setSS58Format } from '@polkadot/util-crypto';

import { PAIRSSR25519 } from '../testing';
import { createTestPairs } from '../testingPairs';
import { Keyring } from '..';
import { createPair } from '.';

const keyring = createTestPairs({ type: 'ed25519' }, false);

const TEST_ADDRESS = '0x4119b2e6c3Cb618F4f0B93ac77f9BeeC7FF02887';

describe('pair', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  const SIGNATURE = new Uint8Array([80, 191, 198, 147, 225, 207, 75, 88, 126, 39, 129, 109, 191, 38, 72, 181, 75, 254, 81, 143, 244, 79, 237, 38, 236, 141, 28, 252, 134, 26, 169, 234, 79, 33, 153, 158, 151, 34, 175, 188, 235, 20, 35, 135, 83, 120, 139, 211, 233, 130, 1, 208, 201, 215, 73, 80, 56, 98, 185, 196, 11, 8, 193, 14]);
  const ENCRYPTED = new Uint8Array([64, 66, 233, 248, 187, 191, 112, 203, 133, 158, 33, 5, 234, 154, 152, 150, 19, 65, 210, 172, 115, 143, 130, 42, 16, 117, 169, 43, 212, 21, 198, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 5, 150, 194, 248, 135, 140, 215, 78, 199, 246, 215, 166, 202, 187, 191, 188, 77, 134, 80, 196]);

  // the last byte is changed from 196 -> 197
  const ENCRYPTED_CHANGED = new Uint8Array([64, 66, 233, 248, 187, 191, 112, 203, 133, 158, 33, 5, 234, 154, 152, 150, 19, 65, 210, 172, 115, 143, 130, 42, 16, 117, 169, 43, 212, 21, 198, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72, 5, 150, 194, 248, 135, 140, 215, 78, 199, 246, 215, 166, 202, 187, 191, 188, 77, 134, 80, 197]);

  it('has a publicKey', (): void => {
    expect(
      keyring.alice.publicKey
    ).toEqual(
      new Uint8Array([209, 114, 167, 76, 218, 76, 134, 89, 18, 195, 43, 160, 168, 10, 87, 174, 105, 171, 174, 65, 14, 92, 203, 89, 222, 232, 78, 47, 68, 50, 219, 79])
    );
    expect(
      keyring.alice.addressRaw
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
        SIGNATURE,
        keyring.alice.publicKey
      )
    ).toEqual(true);
  });

  it('fails a correctly signed message (signer changed)', (): void => {
    expect(
      keyring.alice.verify(
        new Uint8Array([0x61, 0x62, 0x63, 0x64]),
        SIGNATURE,
        keyring.bob.publicKey
      )
    ).toEqual(false);
  });

  it('fails a correctly signed message (message changed)', (): void => {
    expect(
      keyring.alice.verify(
        new Uint8Array([0x61, 0x62, 0x63, 0x64, 0x65]),
        SIGNATURE,
        keyring.alice.publicKey
      )
    ).toEqual(false);
  });

  it('allows vrf sign and verify', (): void => {
    const message = new Uint8Array([0x61, 0x62, 0x63, 0x64, 0x65]);

    expect(
      keyring.alice.vrfVerify(
        message,
        keyring.alice.vrfSign(message),
        keyring.alice.publicKey
      )
    ).toBe(true);
  });

  it('fails vrf sign and verify (publicKey changed)', (): void => {
    const message = new Uint8Array([0x61, 0x62, 0x63, 0x64, 0x65]);

    expect(
      keyring.alice.vrfVerify(
        message,
        keyring.alice.vrfSign(message),
        keyring.bob.publicKey
      )
    ).toBe(false);
  });

  it('allows encrypting', (): void => {
    const message = new Uint8Array([0x61, 0x62, 0x63, 0x64, 0x65]);

    expect(
      keyring.alice.encryptMessage(
        message,
        keyring.bob.encryptionPublicKey,
        new Uint8Array(24)
      )
    ).toEqual(ENCRYPTED);
  });

  it('validates a correctly encrypted message', (): void => {
    const message = new Uint8Array([0x61, 0x62, 0x63, 0x64, 0x65]);

    expect(
      keyring.bob.decryptMessage(ENCRYPTED)
    ).toEqual(message);
  });

  it('fails a correctly encrypted message (message changed)', (): void => {
    expect(
      keyring.bob.decryptMessage(ENCRYPTED_CHANGED)
    ).toEqual(null);
  });

  it('fails a correctly encrypted message (receiver changed)', (): void => {
    expect(
      keyring.charlie.decryptMessage(ENCRYPTED)
    ).toEqual(null);
  });

  it('validates encryption between ed25519 & sr25519 key pairs', (): void => {
    const PASS = 'testing';
    const encodedA = keyring.alice.encodePkcs8(PASS);
    const encodedB = keyring.bob.encodePkcs8(PASS);

    const pairA = createPair({ toSS58, type: 'sr25519' }, { publicKey: keyring.alice.encryptionPublicKey });
    const pairB = createPair({ toSS58, type: 'sr25519' }, { publicKey: keyring.bob.encryptionPublicKey });

    pairA.decodePkcs8(PASS, encodedA);
    pairB.decodePkcs8(PASS, encodedB);
    const message = new Uint8Array([0x61, 0x62, 0x63, 0x64, 0x65]);

    // alice-sr25519 -> bob-ed25519
    const encrypted1 = pairA.encryptMessage(message, keyring.bob.encryptionPublicKey);

    // alice-sr25519 -> bob-sr25519
    const encrypted2 = pairA.encryptMessage(message, pairB.encryptionPublicKey);

    // alice-ed25519 -> bob-sr25519
    const encrypted3 = keyring.alice.encryptMessage(message, pairB.encryptionPublicKey);

    // decrypt: Bob-ed25519 - use alice-ed25519 pubkey
    expect(
      keyring.bob.decryptMessage(encrypted3)
    ).toEqual(message);

    // decrypt: Bob-ed25519 - use alice-sr25519 pubkey
    expect(
      keyring.bob.decryptMessage(encrypted1)
    ).toEqual(message);

    // decrypt: Bob-sr25519 - use alice-sr25519 pubkey
    expect(
      pairB.decryptMessage(encrypted2)
    ).toEqual(message);
  });

  it('passes the test on issue#1314', (): void => {
    // Ref: https://github.com/polkadot-js/common/issues/1314

    const keyring = new Keyring();

    const senderPair = keyring.createFromUri(mnemonicGenerate(), { name: 'first pair' }, 'sr25519');
    const receiverPair = keyring.createFromUri(mnemonicGenerate(), { name: 'second pair' }, 'sr25519');

    const message = stringToU8a('This is a test.');
    const encryptedMessage = senderPair.encryptMessage(message, receiverPair.encryptionPublicKey);

    const decryptedMessage = receiverPair.decryptMessage(encryptedMessage);

    expect(u8aToString(message)).toEqual(u8aToString(decryptedMessage));
  });

  it('allows setting/getting of meta', (): void => {
    keyring.bob.setMeta({ foo: 'bar', something: 'else' });

    expect(keyring.bob.meta).toMatchObject({ foo: 'bar', something: 'else' });

    keyring.bob.setMeta({ something: 'thing' });

    expect(keyring.bob.meta).toMatchObject({ foo: 'bar', something: 'thing' });
  });

  it('allows encoding of address with different prefixes', (): void => {
    expect(keyring.alice.address).toEqual('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua');

    setSS58Format(255);

    expect(keyring.alice.address).toEqual('yGHU8YKprxHbHdEv7oUK4rzMZXtsdhcXVG2CAMyC9WhzhjH2k');

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
    const alice = createPair({ toSS58, type: 'sr25519' }, { publicKey: PAIRSSR25519[0].publicKey, secretKey: PAIRSSR25519[0].secretKey }, {});
    const stash = alice.derive('//stash');
    const soft = alice.derive('//funding/0');

    expect(stash.publicKey).toEqual(PAIRSSR25519[1].publicKey);
    expect(soft.address).toEqual('5ECQNn7UueWHPFda5qUi4fTmTtyCnPvGnuoyVVSj5CboJh9J');
  });

  it('fails to sign when locked', (): void => {
    const pair = createPair({ toSS58, type: 'sr25519' }, { publicKey: keyring.alice.publicKey });

    expect(pair.isLocked).toEqual(true);
    expect((): Uint8Array =>
      pair.sign(new Uint8Array([0]))
    ).toThrow('Cannot sign with a locked key pair');
  });

  describe('ethereum', (): void => {
    const PUBLICDERIVED = new Uint8Array([
      3, 129, 53, 27, 27, 70, 210, 96,
      43, 9, 146, 187, 93, 85, 49, 249,
      193, 105, 107, 8, 18, 254, 178, 83,
      75, 104, 132, 173, 196, 126, 46, 29,
      139
    ]);
    const SECRETDERIVED = new Uint8Array([
      7, 13, 195, 17, 115, 0, 1, 25,
      24, 226, 107, 2, 23, 105, 69, 204,
      21, 195, 213, 72, 207, 73, 253, 132,
      24, 217, 127, 147, 175, 105, 158, 70
    ]);

    it('has a valid address from a known public', (): void => {
      const pair = createPair({ toSS58, type: 'ethereum' }, { publicKey: hexToU8a('0x03b9dc646dd71118e5f7fda681ad9eca36eb3ee96f344f582fbe7b5bcdebb13077') });

      expect(pair.address).toEqual(TEST_ADDRESS);
      expect(pair.addressRaw).toEqual(hexToU8a(TEST_ADDRESS));
    });

    it('has a valid address from a known ethereum address (20 length)', (): void => {
      const pair = createPair({ toSS58, type: 'ethereum' }, { publicKey: new Uint8Array([75, 32, 205, 127, 248, 119, 52, 31, 46, 171, 170, 23, 158, 23, 46, 108, 95, 180, 186, 168]), secretKey: new Uint8Array([]) });

      expect(pair.address.toLowerCase()).toEqual('0x4b20cd7ff877341f2eabaa179e172e6c5fb4baa8');
      expect(pair.addressRaw).toEqual(hexToU8a('0x4b20cd7ff877341f2eabaa179e172e6c5fb4baa8'));
    });

    it('converts to json', (): void => {
      const pair = createPair({ toSS58, type: 'ethereum' }, { publicKey: PUBLICDERIVED, secretKey: SECRETDERIVED });
      const json = pair.toJson('password');

      expect(json.encoding).toEqual({
        content: ['pkcs8', 'ethereum'],
        type: ['scrypt', 'xsalsa20-poly1305'],
        version: '3'
      });
      expect(json.address).toEqual(u8aToHex(PUBLICDERIVED));
    });

    it('denies access to encryptMessage/decryptMessage API', (): void => {
      const PASS = 'testing';
      const encoded = keyring.alice.encodePkcs8(PASS);

      const pair = createPair({ toSS58, type: 'ethereum' }, { publicKey: keyring.alice.publicKey });

      pair.decodePkcs8(PASS, encoded);

      expect(
        () => pair.encryptMessage(
          new Uint8Array(4), // null message
          keyring.bob.publicKey,
          new Uint8Array(24)
        )
      ).toThrow('Secp256k1 not supported yet');
    });
  });
});
