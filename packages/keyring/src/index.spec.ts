// Copyright 2017-2020 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { hexToU8a, stringToU8a } from '@polkadot/util';
import { cryptoWaitReady, setSS58Format, encodeAddress } from '@polkadot/util-crypto';

import Keyring from '.';

describe('keypair', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

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

    it('creates a ed25519 pair via mnemonicToSeed', (): void => {
      expect(
        keyring.addFromUri(
          'seed sock milk update focus rotate barely fade car face mechanic mercy'
        ).address
      ).toEqual('5DkQP32jP4DVJLWWBRBoZF2tpWjqFrcrTBo6H5NcSk7MxKCC');
    });

    it('adds from a mnemonic, with correct ss58', (): void => {
      setSS58Format(20); // this would not be used
      keyring.setSS58Format(68); // this would be used

      const pair = keyring.addFromMnemonic('moral movie very draw assault whisper awful rebuild speed purity repeat card', {});

      expect(pair.address).toEqual('7sPsxWPE5DzAyPT3VuoJYw5NTGscx9QYN9oddQx4kALKC3hH');
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
          JSON.parse('{"address":"5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua","encoded":"0xb4a14995d25ab609f3686e9fa45f1fb237cd833f33f00d4b12c51858ca070d96972e47d73aae5eeb0fc06f923826cf0943fdb02c2c2ee30ef52a7912663053940d1da4da66b3a3f520ae07422c1c94b2d95690fca9d1f4a997623bb2923a8833280e19e7f72c3c5cfa343974e60e2b3dc53b404fdaf330756daad5e4e3","encoding":{"content":"pkcs8","type":"xsalsa20-poly1305","version":"0"},"meta":{"isTesting":true,"name":"alice"}}')
        ).publicKey
      ).toEqual(
        new Uint8Array([209, 114, 167, 76, 218, 76, 134, 89, 18, 195, 43, 160, 168, 10, 87, 174, 105, 171, 174, 65, 14, 92, 203, 89, 222, 232, 78, 47, 68, 50, 219, 79])
      );
    });

    it('signs and verifies', (): void => {
      const MESSAGE = stringToU8a('this is a message');
      const pair = keyring.getPair(publicKeyOne);
      const signature = pair.sign(MESSAGE);

      expect(pair.verify(MESSAGE, signature)).toBe(true);
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

    it('adds the pair', (): void => {
      expect(
        keyring.addFromSeed(seedTwo, {}).publicKey
      ).toEqual(publicKeyTwo);
    });

    it('adds from a mnemonic', (): void => {
      keyring.setSS58Format(68);

      expect(
        keyring.addFromMnemonic('moral movie very draw assault whisper awful rebuild speed purity repeat card', {}).address
      ).toEqual('7qQGarA4PWjPPVHG4USn1yuuVZvEHN7XZz8o7EbAp48jayZQ');
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
          JSON.parse('{"address":"5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua","encoded":"0xb4a14995d25ab609f3686e9fa45f1fb237cd833f33f00d4b12c51858ca070d96972e47d73aae5eeb0fc06f923826cf0943fdb02c2c2ee30ef52a7912663053940d1da4da66b3a3f520ae07422c1c94b2d95690fca9d1f4a997623bb2923a8833280e19e7f72c3c5cfa343974e60e2b3dc53b404fdaf330756daad5e4e3","encoding":{"content":"pkcs8","type":"xsalsa20-poly1305","version":"0"},"meta":{"isTesting":true,"name":"alice"}}')
        ).publicKey
      ).toEqual(
        new Uint8Array([209, 114, 167, 76, 218, 76, 134, 89, 18, 195, 43, 160, 168, 10, 87, 174, 105, 171, 174, 65, 14, 92, 203, 89, 222, 232, 78, 47, 68, 50, 219, 79])
      );
    });

    it('signs and verifies', (): void => {
      const MESSAGE = stringToU8a('this is a message');
      const pair = keyring.getPair(publicKeyOne);
      const signature = pair.sign(MESSAGE);

      expect(pair.verify(MESSAGE, signature)).toBe(true);
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
      keyring.setSS58Format(68);

      expect(
        keyring.addFromMnemonic('moral movie very draw assault whisper awful rebuild speed purity repeat card').address
      ).toEqual('7ooxHV3mz4nnWbK8v7Mxcb71QMpof268eL1A2VrYWUNWJk8P');
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
          JSON.parse('{"address":"5DzMsaYFhmpRdErWrP6K6PD7UXzYoeETToSBUrZSvxasqWRz","encoded":"0xa192d39b42bc1601bf61df31039a554228593fadf870bc837b658a5114627aca199fff596260c95fe8994c66a47636cf0270aa08f402ba5541038753960d00e6c3af5e239ec58fb1eef3db7d6bc266f4853bdfe4ed17122d9092d879014d53980d2ee57f6f55a88c38836447d8645008e8815379626addc8f81f80cd49a2","encoding":{"content":"pkcs8","type":"xsalsa20-poly1305","version":"2"},"meta":{}}')
        ).address
      ).toEqual('5DzMsaYFhmpRdErWrP6K6PD7UXzYoeETToSBUrZSvxasqWRz');
    });

    it('signs and verifies', (): void => {
      const MESSAGE = stringToU8a('this is a message');
      const pair = keyring.getPair(addressKeyOne);
      const signature = pair.sign(MESSAGE);

      expect(pair.verify(MESSAGE, signature)).toBe(true);
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
});
