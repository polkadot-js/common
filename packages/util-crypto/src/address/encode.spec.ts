// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createTestPairs } from '@polkadot/keyring/testingPairs';

import { encodeAddress } from '.';

const keyring = createTestPairs({ type: 'ed25519' }, false);

const SUBKEY = [
  {
    address: '5DA4D4GL5iakrn22h5uKoevgvo18Pqj5BcdEUv8etEDPdijA',
    publicKey: '0x3050f8456519829fe03302da802d22d3233a5f4037b9a3e2bcc403ccfcb2d735',
    ss58Format: 42
  },
  {
    // ecdsa
    address: '4pbsSkWcBaYoFHrKJZp5fDVUKbqSYD9dhZZGvpp3vQ5ysVs5ybV',
    publicKey: '0x035676109c54b9a16d271abeb4954316a40a32bcce023ac14c8e26e958aa68fba9',
    ss58Format: 200
  },
  {
    address: 'yGF4JP7q5AK46d1FPCEm9sYQ4KooSjHMpyVAjLnsCSWVafPnf',
    publicKey: '0x66cd6cf085627d6c85af1aaf2bd10cf843033e929b4e3b1c2ba8e4aa46fe111b',
    ss58Format: 255
  },
  {
    address: 'yGDYxQatQwuxqT39Zs4LtcTnpzE12vXb7ZJ6xpdiHv6gTu1hF',
    publicKey: '0x242fd5a078ac6b7c3c2531e9bcf1314343782aeb58e7bc6880794589e701db55',
    ss58Format: 255
  },
  {
    address: 'r6Gr4gaMP8TsjhFbqvZhv3YvnasugLiRJpzpRHifsqqG18UXa',
    publicKey: '0x88f01441682a17b52d6ae12d1a5670cf675fd254897efabaa5069eb3a701ab73',
    ss58Format: 14269
  }
];

describe('encode', (): void => {
  it('encodes an address to a valid value', (): void => {
    expect(
      keyring.alice.address
    ).toEqual('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua');
  });

  it('can re-encode an address', (): void => {
    expect(
      encodeAddress('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', 2)
    ).toEqual('HNZata7iMYWmk5RvZRTiAsSDhV8366zq2YGb3tLH5Upf74F');
  });

  it('can re-encode an address to Polkadot live', (): void => {
    expect(
      encodeAddress('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', 0)
    ).toEqual('15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5');
  });

  it('fails when non-valid publicKey provided', (): void => {
    expect(
      (): string => encodeAddress(
        keyring.alice.publicKey.slice(0, 30)
      )
    ).toThrow(/Expected a valid key/);
  });

  it('encodes a 1-byte address', (): void => {
    expect(
      encodeAddress(
        new Uint8Array([1])
      )
    ).toEqual('F7NZ');
  });

  it('encodes a 1-byte address (with prefix)', (): void => {
    expect(
      encodeAddress(
        new Uint8Array([1]), 2
      )
    ).toEqual('g4b');
  });

  it('encodes a 2-byte address', (): void => {
    expect(
      encodeAddress(
        new Uint8Array([0, 1]), 2
      )
    ).toEqual('3xygo');
  });

  it('encodes a 4-byte address', (): void => {
    expect(
      encodeAddress(
        new Uint8Array([1, 2, 3, 4]), 2
      )
    ).toEqual('zswfoZa');
  });

  it('encodes a 8-byte address', (): void => {
    expect(
      encodeAddress(
        new Uint8Array([42, 44, 10, 0, 0, 0, 0, 0]), 2
      )
    ).toEqual('848Gh2GcGaZia');
  });

  it('encodes an 33-byte address', (): void => {
    expect(
      encodeAddress('0x03b9dc646dd71118e5f7fda681ad9eca36eb3ee96f344f582fbe7b5bcdebb13077')
    ).toEqual('KWCv1L3QX9LDPwY4VzvLmarEmXjVJidUzZcinvVnmxAJJCBou');
  });

  it('encodes with 2 byte prefix', (): void => {
    expect(
      encodeAddress(keyring.alice.publicKey, 255)
    ).toEqual('yGHU8YKprxHbHdEv7oUK4rzMZXtsdhcXVG2CAMyC9WhzhjH2k');
  });

  SUBKEY.forEach(({ address, publicKey, ss58Format }, index): void => {
    it(`encodes with Subkey equality (${index})`, (): void => {
      expect(
        encodeAddress(publicKey, ss58Format)
      ).toEqual(address);
    });
  });
});
