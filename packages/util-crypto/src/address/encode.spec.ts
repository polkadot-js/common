// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { createTestPairs } from '@polkadot/keyring/testingPairs';

import { encodeAddress } from '.';

const keyring = createTestPairs({ type: 'ed25519' }, false);

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
    ).toEqual('2vRvjTMnza9uQZzYcjtEHiYkUzLaUvfXxA5nvU2qC68YUvS9VD');
  });
});
