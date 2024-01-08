// Copyright 2017-2024 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import type { KeyringPair$Json } from './types.js';

import { hexToU8a, stringToU8a } from '@polkadot/util';
import { base64Decode, cryptoWaitReady, encodeAddress, randomAsU8a, setSS58Format } from '@polkadot/util-crypto';

import { decodePair } from './pair/decode.js';
import Keyring from './index.js';

await cryptoWaitReady();

describe('keypair', (): void => {
  describe('ed25519', (): void => {
    const publicKeyOne = new Uint8Array([47, 140, 97, 41, 216, 22, 207, 81, 195, 116, 188, 127, 8, 195, 230, 62, 209, 86, 207, 120, 174, 251, 74, 101, 80, 217, 123, 135, 153, 121, 119, 238]);
    const publicKeyTwo = new Uint8Array([215, 90, 152, 1, 130, 177, 10, 183, 213, 75, 254, 211, 201, 100, 7, 58, 14, 225, 114, 243, 218, 166, 35, 37, 175, 2, 26, 104, 247, 7, 81, 26]);
    const seedOne = stringToU8a('12345678901234567890123456789012');
    const seedTwo = hexToU8a('0x9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60');
    let keyring: Keyring;

    beforeEach((): void => {
      keyring = new Keyring({ ss58Format: 42, type: 'ed25519' });

      keyring.addFromSeed(seedOne, {});
    });

    it('adds the pair', (): void => {
      expect(
        keyring.addFromSeed(seedTwo, {}).publicKey
      ).toEqual(publicKeyTwo);
    });

    it('creates via a dev seed', (): void => {
      expect(
        keyring.addFromUri('//Alice').address
      ).toEqual('5FA9nQDVg267DEd8m1ZypXLBnvN7SFxYwV7ndqSYGiN9TTpu');
    });

    it('creates a ed25519 pair via mnemonicToSeed', (): void => {
      expect(
        keyring.addFromUri(
          'seed sock milk update focus rotate barely fade car face mechanic mercy'
        ).address
      ).toEqual('5DkQP32jP4DVJLWWBRBoZF2tpWjqFrcrTBo6H5NcSk7MxKCC');
    });

    it('adds from a mnemonic, with correct ss58', (): void => {
      // eslint-disable-next-line deprecation/deprecation
      setSS58Format(20); // this would not be used
      keyring.setSS58Format(2); // this would be used

      const pair = keyring.addFromMnemonic('moral movie very draw assault whisper awful rebuild speed purity repeat card', {});

      expect(pair.address).toEqual('HSLu2eci2GCfWkRimjjdTXKoFSDL3rBv5Ey2JWCBj68cVZj');
      expect(encodeAddress(pair.publicKey)).toEqual('35cDYtPsdG1HUa2n2MaARgJyRz1WKMBZK1DL6c5cX7nugQh1');
    });

    it('allows publicKeys retrieval', (): void => {
      keyring.addFromSeed(seedTwo, {});

      expect(
        keyring.getPublicKeys()
      ).toEqual([publicKeyOne, publicKeyTwo]);
    });

    it('allows retrieval of a specific item', (): void => {
      expect(
        keyring.getPair(publicKeyOne).publicKey
      ).toEqual(publicKeyOne);
    });

    it('allows adding from JSON', (): void => {
      expect(
        keyring.addFromJson(
          JSON.parse('{"address":"5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua","encoded":"0xb4a14995d25ab609f3686e9fa45f1fb237cd833f33f00d4b12c51858ca070d96972e47d73aae5eeb0fc06f923826cf0943fdb02c2c2ee30ef52a7912663053940d1da4da66b3a3f520ae07422c1c94b2d95690fca9d1f4a997623bb2923a8833280e19e7f72c3c5cfa343974e60e2b3dc53b404fdaf330756daad5e4e3","encoding":{"content":"pkcs8","type":"xsalsa20-poly1305","version":"0"},"meta":{"isTesting":true,"name":"alice"}}') as KeyringPair$Json
        ).publicKey
      ).toEqual(
        new Uint8Array([209, 114, 167, 76, 218, 76, 134, 89, 18, 195, 43, 160, 168, 10, 87, 174, 105, 171, 174, 65, 14, 92, 203, 89, 222, 232, 78, 47, 68, 50, 219, 79])
      );
    });

    it('signs and verifies', (): void => {
      const MESSAGE = stringToU8a('this is a message');
      const pair = keyring.getPair(publicKeyOne);
      const signature = pair.sign(MESSAGE);

      expect(pair.verify(MESSAGE, signature, pair.publicKey)).toBe(true);
      expect(pair.verify(MESSAGE, signature, randomAsU8a())).toBe(false);
      expect(pair.verify(new Uint8Array(), signature, pair.publicKey)).toBe(false);
    });

    it('signs and verifies (withType)', (): void => {
      const MESSAGE = stringToU8a('this is a message');
      const pair = keyring.getPair(publicKeyOne);
      const signature = pair.sign(MESSAGE, { withType: true });

      expect(pair.verify(MESSAGE, signature, pair.publicKey)).toBe(true);
      expect(pair.verify(MESSAGE, signature, randomAsU8a())).toBe(false);
      expect(pair.verify(new Uint8Array(), signature, pair.publicKey)).toBe(false);
    });
  });

  describe('sr25519', (): void => {
    const publicKeyOne = new Uint8Array([116, 28, 8, 160, 111, 65, 197, 150, 96, 143, 103, 116, 37, 155, 217, 4, 51, 4, 173, 250, 93, 62, 234, 98, 118, 11, 217, 190, 151, 99, 77, 99]);
    const publicKeyTwo = hexToU8a('0x44a996beb1eef7bdcab976ab6d2ca26104834164ecf28fb375600576fcc6eb0f');
    const seedOne = stringToU8a('12345678901234567890123456789012');
    const seedTwo = hexToU8a('0x9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60');
    let keyring: Keyring;

    beforeEach((): void => {
      keyring = new Keyring({ ss58Format: 42, type: 'sr25519' });

      keyring.addFromSeed(seedOne, {});
    });

    it('creates with dev phrase when only path specified', (): void => {
      expect(
        keyring.createFromUri('//Alice').address
      ).toEqual('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY');
    });

    it('creates with integer derivations', (): void => {
      // MAX_SAFE_INTEGER
      expect(
        keyring.createFromUri('//9007199254740991').address
      ).toEqual('5CDsyNZyqxLpHnTvknr68anUcYoBFjZbFKiEJJf4prB75Uog');

      // MAX_SAFE_INTEGER + extra digits
      expect(
        keyring.createFromUri('//900719925474099999').address
      ).toEqual('5GHj2D7RG2m2DXYwGSDpXwuuxn53G987i7p2EQVDqP4NYu4q');
    });

    it('creates via dev seed (2-byte encoding)', (): void => {
      keyring.setSS58Format(252);

      expect(
        keyring.addFromUri('//Alice').address
      ).toEqual('xw8P6urbSAronL3zZFB7dg8p7LLSgKCUFDUgjohnf1iP434ic');
    });

    it('adds the pair', (): void => {
      expect(
        keyring.addFromSeed(seedTwo, {}).publicKey
      ).toEqual(publicKeyTwo);
    });

    it('adds from a mnemonic', (): void => {
      keyring.setSS58Format(2);

      expect(
        keyring.addFromMnemonic('moral movie very draw assault whisper awful rebuild speed purity repeat card', {}).address
      ).toEqual('FSjXNRT2K1R5caeHLPD6WMrqYUpfGZB7ua8W89JFctZ1YqV');
    });

    it('allows publicKeys retrieval', (): void => {
      keyring.addFromSeed(seedTwo, {});

      expect(
        keyring.getPublicKeys()
      ).toEqual([publicKeyOne, publicKeyTwo]);
    });

    it('allows retrieval of a specific item', (): void => {
      expect(
        keyring.getPair(publicKeyOne).publicKey
      ).toEqual(publicKeyOne);
    });

    it('allows adding from JSON', (): void => {
      expect(
        keyring.addFromJson(
          JSON.parse('{"address":"5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua","encoded":"0xb4a14995d25ab609f3686e9fa45f1fb237cd833f33f00d4b12c51858ca070d96972e47d73aae5eeb0fc06f923826cf0943fdb02c2c2ee30ef52a7912663053940d1da4da66b3a3f520ae07422c1c94b2d95690fca9d1f4a997623bb2923a8833280e19e7f72c3c5cfa343974e60e2b3dc53b404fdaf330756daad5e4e3","encoding":{"content":"pkcs8","type":"xsalsa20-poly1305","version":"0"},"meta":{"isTesting":true,"name":"alice"}}') as KeyringPair$Json
        ).publicKey
      ).toEqual(
        new Uint8Array([209, 114, 167, 76, 218, 76, 134, 89, 18, 195, 43, 160, 168, 10, 87, 174, 105, 171, 174, 65, 14, 92, 203, 89, 222, 232, 78, 47, 68, 50, 219, 79])
      );
    });

    it('signs and verifies', (): void => {
      const MESSAGE = stringToU8a('this is a message');
      const pair = keyring.getPair(publicKeyOne);
      const signature = pair.sign(MESSAGE);

      expect(pair.verify(MESSAGE, signature, pair.publicKey)).toBe(true);
      expect(pair.verify(MESSAGE, signature, randomAsU8a())).toBe(false);
      expect(pair.verify(new Uint8Array(), signature, pair.publicKey)).toBe(false);
    });

    it('signs and verifies (withType)', (): void => {
      const MESSAGE = stringToU8a('this is a message');
      const pair = keyring.getPair(publicKeyOne);
      const signature = pair.sign(MESSAGE, { withType: true });

      expect(pair.verify(MESSAGE, signature, pair.publicKey)).toBe(true);
      expect(pair.verify(MESSAGE, signature, randomAsU8a())).toBe(false);
      expect(pair.verify(new Uint8Array(), signature, pair.publicKey)).toBe(false);
    });
  });

  describe('ecdsa', (): void => {
    const seedOne = 'potato act energy ahead stone taxi receive fame gossip equip chest round';
    const seedTwo = hexToU8a('0x3c74be003bd9a876be439949ccf2b292bd966c94959a689173b295b326cd6da7');
    const publicKeyOne = hexToU8a('0x02c6b6c664db5ef505477bba1cf2f1789c98796b9bb5fa21abd0ac4589bed980e7');
    const publicKeyTwo = hexToU8a('0x021da683b913fb28c979ba3e5f1881415cef4b1f58a5d05ed3610a2995e7b4943c');
    const addressKeyOne = hexToU8a('0x0cfd0dd2c59a9987b9848919163931b6a42283ffd3d91e92c98b522525a7038f');
    let keyring: Keyring;

    beforeEach((): void => {
      keyring = new Keyring({ ss58Format: 42, type: 'ecdsa' });

      keyring.addFromMnemonic(seedOne, {});
    });

    it('creates with dev phrase when only path specified', (): void => {
      expect(
        keyring.createFromUri('//Alice').address
      ).toEqual('5C7C2Z5sWbytvHpuLTvzKunnnRwQxft1jiqrLD5rhucQ5S9X');
    });

    it('adds the pair', (): void => {
      expect(
        keyring.addFromSeed(seedTwo, {}).publicKey
      ).toEqual(publicKeyTwo);
    });

    it('adds from a mnemonic', (): void => {
      keyring.setSS58Format(2);

      expect(
        keyring.addFromMnemonic('moral movie very draw assault whisper awful rebuild speed purity repeat card').address
      ).toEqual('DrRE1KAcs4pCicX8yJPh7YxkLPQ2vXnCFSVRPQfx38KjEFe');
    });

    it('allows publicKeys retrieval', (): void => {
      keyring.addFromSeed(seedTwo, {});

      expect(
        keyring.getPublicKeys()
      ).toEqual([publicKeyOne, publicKeyTwo]);
    });

    it('allows retrieval of a specific item', (): void => {
      expect(
        keyring.getPair(addressKeyOne).publicKey
      ).toEqual(publicKeyOne);
    });

    it('allows adding from JSON', (): void => {
      expect(
        keyring.addFromJson(
          JSON.parse('{"address":"5DzMsaYFhmpRdErWrP6K6PD7UXzYoeETToSBUrZSvxasqWRz","encoded":"0xa192d39b42bc1601bf61df31039a554228593fadf870bc837b658a5114627aca199fff596260c95fe8994c66a47636cf0270aa08f402ba5541038753960d00e6c3af5e239ec58fb1eef3db7d6bc266f4853bdfe4ed17122d9092d879014d53980d2ee57f6f55a88c38836447d8645008e8815379626addc8f81f80cd49a2","encoding":{"content":"pkcs8","type":"xsalsa20-poly1305","version":"2"},"meta":{}}') as KeyringPair$Json
        ).address
      ).toEqual('5DzMsaYFhmpRdErWrP6K6PD7UXzYoeETToSBUrZSvxasqWRz');
    });

    it('allows creation from JSON', (): void => {
      keyring.setSS58Format(2);
      const pair = keyring.createFromJson(
        JSON.parse('{"address":"0x02fde629668eb2bcc7d748f40a7e597f7c7b363498ff3db31f03ce4854937883ad","encoded":"qIhAhKqtf2iyEoWEr8nmBdksSI8EHHCpgJHToqd6Pl8AgAAAAQAAAAgAAADDZ//fj/BRRj+0+bl1KAlYgoPJp6nEUwiw0fVqO2BW4mjEgQ+iWwJEgDf1JUtecbzOlfhTXBzqX/dIYzLgUADrF4EFEPpboCWiU1iN7W/3DM1cOTRVvTGcbdIqW//z3axhz961qzeJVUIFgllwGe/euLUPIlKbIkiN/CsRYdQ=","encoding":{"content":["pkcs8","ecdsa"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"meta":{"genesisHash":"0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe","name":"ecdsa","tags":[],"whenCreated":1600925898271}}') as KeyringPair$Json
      );

      expect(pair.address).toEqual('DHL8HKFuTTR55JzzLmkJRCAfPBbuevKaT9cXikxbEV97Ko8');
      expect(pair.publicKey).toEqual(hexToU8a('0x02fde629668eb2bcc7d748f40a7e597f7c7b363498ff3db31f03ce4854937883ad'));
    });

    it('fails toJson() when password is incorrect', (): void => {
      const pair = keyring.createFromJson(
        JSON.parse('{"address":"0x02fde629668eb2bcc7d748f40a7e597f7c7b363498ff3db31f03ce4854937883ad","encoded":"qIhAhKqtf2iyEoWEr8nmBdksSI8EHHCpgJHToqd6Pl8AgAAAAQAAAAgAAADDZ//fj/BRRj+0+bl1KAlYgoPJp6nEUwiw0fVqO2BW4mjEgQ+iWwJEgDf1JUtecbzOlfhTXBzqX/dIYzLgUADrF4EFEPpboCWiU1iN7W/3DM1cOTRVvTGcbdIqW//z3axhz961qzeJVUIFgllwGe/euLUPIlKbIkiN/CsRYdQ=","encoding":{"content":["pkcs8","ecdsa"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"meta":{"genesisHash":"0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe","name":"ecdsa","tags":[],"whenCreated":1600925898271}}') as KeyringPair$Json
      );

      expect(
        () => pair.toJson('invalid')
      ).toThrow(/Unable to decode using the supplied passphrase/);
    });

    it('pass toJson() when password is correct', (): void => {
      const pair = keyring.createFromJson(
        JSON.parse('{"address":"0x02fde629668eb2bcc7d748f40a7e597f7c7b363498ff3db31f03ce4854937883ad","encoded":"qIhAhKqtf2iyEoWEr8nmBdksSI8EHHCpgJHToqd6Pl8AgAAAAQAAAAgAAADDZ//fj/BRRj+0+bl1KAlYgoPJp6nEUwiw0fVqO2BW4mjEgQ+iWwJEgDf1JUtecbzOlfhTXBzqX/dIYzLgUADrF4EFEPpboCWiU1iN7W/3DM1cOTRVvTGcbdIqW//z3axhz961qzeJVUIFgllwGe/euLUPIlKbIkiN/CsRYdQ=","encoding":{"content":["pkcs8","ecdsa"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"meta":{"genesisHash":"0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe","name":"ecdsa","tags":[],"whenCreated":1600925898271}}') as KeyringPair$Json
      );

      expect(
        () => pair.toJson('testing')
      ).not.toThrow();
    });

    it('encodes a pair toJSON (and decodes)', (): void => {
      const pair = keyring.createFromUri('moral movie very draw assault whisper awful rebuild speed purity repeat card');
      const json = pair.toJson('password');

      expect(json.address).toEqual('0x03ddca309bd5fedd01f914d6fb76f23aa848a2a520802159215dba5085d7863619');
      expect(json.encoding).toEqual({
        content: ['pkcs8', 'ecdsa'],
        type: ['scrypt', 'xsalsa20-poly1305'],
        version: '3'
      });

      const newPair = keyring.createFromJson(json);

      expect(newPair.publicKey).toEqual(pair.publicKey);
      expect(
        () => newPair.unlock('password')
      ).not.toThrow();
    });

    it('signs and verifies', (): void => {
      const MESSAGE = stringToU8a('this is a message');
      const pair = keyring.getPair(addressKeyOne);
      const signature = pair.sign(MESSAGE);

      expect(pair.verify(MESSAGE, signature, pair.publicKey)).toBe(true);
      expect(pair.verify(MESSAGE, signature, randomAsU8a())).toBe(false);
      expect(pair.verify(new Uint8Array(), signature, pair.publicKey)).toBe(false);
    });

    it('signs and verifies (withType)', (): void => {
      const MESSAGE = stringToU8a('this is a message');
      const pair = keyring.getPair(addressKeyOne);
      const signature = pair.sign(MESSAGE, { withType: true });

      expect(pair.verify(MESSAGE, signature, pair.publicKey)).toBe(true);
      expect(pair.verify(MESSAGE, signature, randomAsU8a())).toBe(false);
      expect(pair.verify(new Uint8Array(), signature, pair.publicKey)).toBe(false);
    });
  });

  describe('ethereum', (): void => {
    // combine mnemonic with derivation path
    const PHRASE = 'seed sock milk update focus rotate barely fade car face mechanic mercy' + '/m/44\'/60\'/0\'/0/0';
    const PRIV_KEY_ONE = '0x070dc3117300011918e26b02176945cc15c3d548cf49fd8418d97f93af699e46';
    const ETH_ADDRESS_ONE = '0x31ea8795EE32D782C8ff41a5C68Dcbf0F5B27f6d';
    const ETH_ADDRESS_TWO = '0x4119b2e6c3Cb618F4f0B93ac77f9BeeC7FF02887';

    let keyring: Keyring;

    beforeEach((): void => {
      keyring = new Keyring({ type: 'ethereum' });
    });

    it('creates with dev phrase from the private key', (): void => {
      const pair = keyring.addFromSeed(hexToU8a(PRIV_KEY_ONE));

      expect(
        pair.address
      ).toEqual(ETH_ADDRESS_ONE);
    });

    it('creates with dev phrase from the private key in createFromUri', (): void => {
      const pair = keyring.createFromUri(PRIV_KEY_ONE);

      expect(
        pair.address
      ).toEqual(ETH_ADDRESS_ONE);
    });

    it('creates with dev phrase with derivation path specified', (): void => {
      const pair = keyring.createFromUri(PHRASE);

      expect(
        pair.address
      ).toEqual(ETH_ADDRESS_ONE);
    });

    it('creates with dev phrase with derivation path specified - addFromUri', (): void => {
      expect(
        keyring.addFromUri(PHRASE).address
      ).toEqual(ETH_ADDRESS_ONE);
    });

    it('creates with dev phrase with derivation path specified - addFromUri with type', (): void => {
      const keyringUntyped = new Keyring();

      expect(
        keyringUntyped.addFromUri(PHRASE, {}, 'ethereum').address
      ).toEqual(ETH_ADDRESS_ONE);
    });

    it('encodes a pair toJSON (and decodes)', (): void => {
      const pair = keyring.createFromUri(PHRASE);
      const json = pair.toJson('password');

      expect(json.address).toEqual('0x0381351b1b46d2602b0992bb5d5531f9c1696b0812feb2534b6884adc47e2e1d8b'); // this is the public key (different from address for ethereum)
      expect(json.encoding).toEqual({
        content: ['pkcs8', 'ethereum'],
        type: ['scrypt', 'xsalsa20-poly1305'],
        version: '3'
      });

      const newPair = keyring.createFromJson(json);

      expect(newPair.publicKey).toEqual(pair.publicKey);
      expect(
        () => newPair.unlock('password')
      ).not.toThrow();
    });

    it('encodes a pair toJSON and back', (): void => {
      const pairOriginal = keyring.createFromUri(PHRASE);
      const json = pairOriginal.toJson('password');
      const pair = keyring.addFromJson(
        json
      );

      expect(pair.address).toEqual(ETH_ADDRESS_ONE);

      pair.decodePkcs8('password');

      expect(pair.isLocked).toBe(false);
      expect(pair.address).toBe(ETH_ADDRESS_ONE);
    });

    it('allows adding from JSON', (): void => {
      const pair = keyring.addFromJson(
        JSON.parse('{"address":"KWCv1L3QX9LDPwY4VzvLmarEmXjVJidUzZcinvVnmxAJJCBou","encoded":"U8qFEaghhmNV2PgFhjqzmhyUy37Ok7abfFU2MNsBd0sAgAAAAQAAAAgAAAA3+NniKogzNphiMNueB1X0sGA07B6CaXWfpXPx45iSXoTTprwzU5mOoSqUWO0GKHROI72LN+uJ8Yfv6Ll6JOOV3VPKfoVoFmYm+zDrrMPa0gk5E5kUuSijxADcE6zUrliPVr0Ix/qaghu5SJ7RtWDQLBf4Hp86SJ8Gg6gTSSk=","encoding":{"content":["pkcs8","ethereum"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"meta":{}}') as KeyringPair$Json
      );

      expect(pair.publicKey).toEqual(hexToU8a('0x03b9dc646dd71118e5f7fda681ad9eca36eb3ee96f344f582fbe7b5bcdebb13077'));
      expect(pair.address).toEqual(ETH_ADDRESS_TWO);

      pair.decodePkcs8('password');

      expect(pair.isLocked).toBe(false);
      expect(pair.publicKey).toEqual(hexToU8a('0x03b9dc646dd71118e5f7fda681ad9eca36eb3ee96f344f582fbe7b5bcdebb13077'));
      expect(pair.address).toBe(ETH_ADDRESS_TWO);
    });

    it('allows for signing/verification', (): void => {
      const MESSAGE = stringToU8a('just some test message');
      const signer = keyring.createFromUri(PHRASE);
      const verifier = keyring.addFromJson(
        JSON.parse('{"address":"KWCv1L3QX9LDPwY4VzvLmarEmXjVJidUzZcinvVnmxAJJCBou","encoded":"U8qFEaghhmNV2PgFhjqzmhyUy37Ok7abfFU2MNsBd0sAgAAAAQAAAAgAAAA3+NniKogzNphiMNueB1X0sGA07B6CaXWfpXPx45iSXoTTprwzU5mOoSqUWO0GKHROI72LN+uJ8Yfv6Ll6JOOV3VPKfoVoFmYm+zDrrMPa0gk5E5kUuSijxADcE6zUrliPVr0Ix/qaghu5SJ7RtWDQLBf4Hp86SJ8Gg6gTSSk=","encoding":{"content":["pkcs8","ethereum"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"meta":{}}') as KeyringPair$Json
      );

      const signature = signer.sign(MESSAGE);
      const dummyPublic = verifier.publicKey.slice();

      dummyPublic[dummyPublic.length - 1] = 0;

      expect(verifier.verify(MESSAGE, signature, signer.publicKey)).toBe(true);
      expect(verifier.verify(MESSAGE, signature, dummyPublic)).toBe(false);
      expect(verifier.verify(new Uint8Array(), signature, signer.publicKey)).toBe(false);
    });

    it('allows for signing/verification (withType)', (): void => {
      const MESSAGE = stringToU8a('just some test message');
      const signer = keyring.createFromUri(PHRASE);
      const verifier = keyring.addFromJson(
        JSON.parse('{"address":"KWCv1L3QX9LDPwY4VzvLmarEmXjVJidUzZcinvVnmxAJJCBou","encoded":"U8qFEaghhmNV2PgFhjqzmhyUy37Ok7abfFU2MNsBd0sAgAAAAQAAAAgAAAA3+NniKogzNphiMNueB1X0sGA07B6CaXWfpXPx45iSXoTTprwzU5mOoSqUWO0GKHROI72LN+uJ8Yfv6Ll6JOOV3VPKfoVoFmYm+zDrrMPa0gk5E5kUuSijxADcE6zUrliPVr0Ix/qaghu5SJ7RtWDQLBf4Hp86SJ8Gg6gTSSk=","encoding":{"content":["pkcs8","ethereum"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"meta":{}}') as KeyringPair$Json
      );

      const signature = signer.sign(MESSAGE, { withType: true });
      const dummyPublic = verifier.publicKey.slice();

      dummyPublic[dummyPublic.length - 1] = 0;

      expect(verifier.verify(MESSAGE, signature, signer.publicKey)).toBe(true);
      expect(verifier.verify(MESSAGE, signature, dummyPublic)).toBe(false);
      expect(verifier.verify(new Uint8Array(), signature, signer.publicKey)).toBe(false);
    });
  });

  describe('raw pair add/create', (): void => {
    const json = JSON.parse('{"address":"5PjeoaQzCoYbSi42aQRKB3Sx18StCaEAzCbGEEbWbZyfKS3H","encoded":"JQUl8ZpoXv2OMkL9TPylLmcIye2cYhaS9INICbFgZTsAgAAAAQAAAAgAAAAr/0hJOOzokIdBG71TstigLABX9D5xGD7L37ySxtjDrVRg26LL90jLQ47quT9o3bq6ppXMVL6USk7Q4p3WU66bojTFuCDyhpYRhNbUqU6s0rD3S4bhv9lG+pG9vQ4eD5PVQUvxdANmJpYuDg45nrTmsMC5AHGdFGkHW/LHnkmbFid1cvPYkdiBoef5CIEdoly512pxMupVxnJWF1NT","encoding":{"content":["pkcs8","sr25519"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"meta":{"name":"hello"}}') as KeyringPair$Json;
    const decoded = decodePair('1', base64Decode(json.encoded), json.encoding.type);
    const keyring = new Keyring({ ss58Format: 44 });

    it('creates a pair from a private/public combo', (): void => {
      const pair = keyring.createFromPair(decoded, json.meta, 'sr25519');

      expect(pair.address).toEqual('5PjeoaQzCoYbSi42aQRKB3Sx18StCaEAzCbGEEbWbZyfKS3H');
      expect(pair.isLocked).toEqual(false);
      expect(pair.meta.name).toEqual('hello');
    });

    it('adds a pair from a private/public combo', (): void => {
      keyring.addFromPair(decoded, json.meta, 'sr25519');

      const pair = keyring.getPairs()[0];

      expect(pair.address).toEqual('5PjeoaQzCoYbSi42aQRKB3Sx18StCaEAzCbGEEbWbZyfKS3H');
      expect(pair.isLocked).toEqual(false);
      expect(pair.meta.name).toEqual('hello');
    });
  });

  describe('util', (): void => {
    let keyring: Keyring;

    beforeEach((): void => {
      keyring = new Keyring({ ss58Format: 42 });
    });

    it('can re-encode an address to Polkadot live', (): void => {
      expect(
        keyring.encodeAddress('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', 0)
      ).toEqual('15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5');
    });

    it('can re-encode an address to keyring default', (): void => {
      expect(
        keyring.encodeAddress('15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5')
      ).toEqual('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY');
    });
  });

  describe('version 2 JSON', (): void => {
    const PAIR = '{"address":"5CczAE5AmGrZ93MeVhha3Ywam7j9dKB7cArnH7gtrXcMFJvu","encoded":"0xee8f236e2ac3217ce689692a4afc612220dc77fddaed0482f8f95136a7c3e034cccfbc495410a6e9b2439904974ed1d207abeca536ff6985ceb78edeeb3dc343e561c184c488101af8811d1331430b4ccf0e96ef507132e5132964e8564232e7100d973c5bee7b231dd0c8ad5273f3501515a422c8d7ed9d20a73c0ed17c98ee4588e54844bb73052dcad81f7a1094613d63c162fec7446c88b1fae70e","encoding":{"content":["pkcs8","sr25519"],"type":"xsalsa20-poly1305","version":"2"},"meta":{"genesisHash":"0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e","name":"json v2","tags":[],"whenCreated":1595243159596}}';
    const PASS2 = 'versionTwo';
    const PASS3 = 'versionThree';
    let keyring: Keyring;

    beforeEach((): void => {
      keyring = new Keyring({ ss58Format: 42 });
    });

    it('can decode from a version 2 JSON file', (): void => {
      const pair = keyring.addFromJson(JSON.parse(PAIR) as KeyringPair$Json);

      pair.decodePkcs8(PASS2);

      const json = pair.toJson(PASS3);

      expect(pair.isLocked).toBe(false);
      expect(pair.address).toBe('5CczAE5AmGrZ93MeVhha3Ywam7j9dKB7cArnH7gtrXcMFJvu');
      expect(json.encoding).toEqual({
        content: ['pkcs8', 'sr25519'],
        type: ['scrypt', 'xsalsa20-poly1305'],
        version: '3'
      });

      pair.decodePkcs8(PASS3);

      expect(pair.address).toEqual('5CczAE5AmGrZ93MeVhha3Ywam7j9dKB7cArnH7gtrXcMFJvu');
    });
  });

  describe('version 3 JSON (hex)', (): void => {
    const PAIR = '{"address":"FLiSDPCcJ6auZUGXALLj6jpahcP6adVFDBUQznPXUQ7yoqH","encoded":"0xcd238963070cc4d6806053ee1ac500c7add9c28732bb5d434a332f84a91d9be0008000000100000008000000cf630a1113941b350ddd06697e50399183162e5e9a0e893eafc7f5f4893a223dca5055706b9925b56fdb4304192143843da718e11717daf89cf4f4781f94fb443f61432f782d54280af9eec90bd3069c3cc2d957a42b7c18dc2e9497f623735518e0e49b58f8e4db2c09da3a45dbb935659d015fc94b946cba75b606a6ff7f4e823f6b049e2e6892026b49de02d6dbbd64646fe0933f537d9ea53a70be","encoding":{"content":["pkcs8","sr25519"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"meta":{"genesisHash":"0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe","name":"version3","tags":[],"whenCreated":1595277797639}}';
    const PASS3 = 'version3';
    let keyring: Keyring;

    beforeEach((): void => {
      keyring = new Keyring({ ss58Format: 2 });
    });

    it('can decode from a version 3 JSON file', (): void => {
      const pair = keyring.addFromJson(JSON.parse(PAIR) as KeyringPair$Json);

      pair.decodePkcs8(PASS3);

      expect(pair.isLocked).toBe(false);
      expect(pair.address).toBe('FLiSDPCcJ6auZUGXALLj6jpahcP6adVFDBUQznPXUQ7yoqH');
    });
  });

  describe('version 3 JSON (base64)', (): void => {
    const PAIR = '{"address":"FLiSDPCcJ6auZUGXALLj6jpahcP6adVFDBUQznPXUQ7yoqH","encoded":"ILjSgYaGvq1zaCz/kx+aqfLaHBjLXz0Qsmr6RnkOVU4AgAAAAQAAAAgAAAB5R2hm5kgXyc0NQYFxvMU4zCdjB+ugs/ibEooqCvuudbaeKn3Ee47NkCqU1ecOJV+eeaVn4W4dRvIpj5kGmQOGsewR+MiQ/B0G9NFh7JXV0qcPlk2QMNW1/mbJrTO4miqL448BSkP7ZOhUV6HFUpMt3B9HwjiRLN8RORcFp0ID/Azs4Jl/xOpXNzbgQGIffWgCIKTxN9N1ku6tdlG4","encoding":{"content":["pkcs8","sr25519"],"type":["scrypt","xsalsa20-poly1305"],"version":"3"},"meta":{"genesisHash":"0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe","name":"version3","tags":[],"whenCreated":1595277797639,"whenEdited":1595278378596}}';
    const PASS3 = 'version3';
    let keyring: Keyring;

    beforeEach((): void => {
      keyring = new Keyring({ ss58Format: 2 });
    });

    it('can decode from a version 3 JSON file', (): void => {
      const pair = keyring.addFromJson(JSON.parse(PAIR) as KeyringPair$Json);

      pair.decodePkcs8(PASS3);

      expect(pair.isLocked).toBe(false);
      expect(pair.address).toBe('FLiSDPCcJ6auZUGXALLj6jpahcP6adVFDBUQznPXUQ7yoqH');
    });
  });
});
